<script context="module">
  import { client, cache }  from '../tinyClient';
  import { INDEX_CLINICS } from './queries';
  import { CONTACTS } from './contacts/queries';

  export async function preload() {
    let _CLINICS = await client( INDEX_CLINICS, { first: 10 } );
    let _CONTACTS = await client( CONTACTS )

    return { _CLINICS, _CONTACTS };
  }
</script>


<script >
  export let _CLINICS;
  export let _CONTACTS;

  import { stores } from '@sapper/app';
  import { onMount } from 'svelte';
  import { country } from '../components/stores/Store-country.js';
  import { contactsIsLoaded, showCallModal, contacts } from '../components/stores/Store-call.js';
  import { showMenu } from '../components/stores/Store-branches.js';
  import { sort } from '../helpers';

  // components
  import SearchBox from '../components/search/Search-box.svelte';
  import Button from '../components/Button.svelte';
  import BranchesMenu from '../components/branches/Branches-menu.svelte';
  import Quote from '../components/Quote.svelte';
  import CardWrapper from '../components/Card-wrapper.svelte';
  import Clinics from '../components/Slider-clinics.svelte';
  import CallToAction from '../components/Call-to-action.svelte';
  import Popup from '../components/Popup.svelte';
  // set preloaded data to cache
  onMount(()=> {
    cache.set(
      JSON.stringify({
        query: INDEX_CLINICS,
        variables : {
          first: 3
        }
      }),
      _CLINICS
    )
    cache.set(
      JSON.stringify({
        query: CONTACTS,
        variables : {
          first: 3
        }
      }),
      _CONTACTS
    )
  });


  // Short data path
  let DATA = _CLINICS.allClinics

  // Load and process contacts
  const { preloading, session } = stores();
  let shift = {field: "ISO", search: $session.geo || "RU"};
  let _contacts = sort(_CONTACTS.allContactCountries, "name", shift);
  let contact = _contacts[0].contacts.find(el=>el.main_number) || _contacts[0].contacts[0];

  console.log($session.geo)


  if(!$contacts) contacts.set(_contacts)
  contactsIsLoaded.set(true)

  function showSearchMenu(){showMenu.set(true)}
  function callModalHandler(){showCallModal.set(true)}

  let showVideoModal = false;
</script>


<template lang='pug'>

svelte:head
  title Аллазия, лечение за рубежом

.head_block
  .logotype(alt="logotype" src="icons/special/logo.svg")

  .text-block
    h1 Лечение<br>за рубежом
    p.p-large Подбираем выгодные условия, консультируем с известными врачами. Организуем поездку на всех этапах. Сотрудничаем с клиниками по всему миру, поэтому наши услуги — бесплатны.
    .tel_wrapper.card_decor__white
      +if('contact?.main_number_desc')
        .info {contact?.main_number_desc}
      a.phone-number(href='{contact?.tel_link}') {contact?.tel}
      .button-wrap
        Button(
          disabled='{!$contactsIsLoaded}'
          size='mini'
          iconR='short_arrow-b'
          text="Номера представительств"
          on:click!='{callModalHandler}'
        )


.find_block
  .head_wrapper
    .illustration
    .texts-wrap
      h2.h2-I Подбор лечения
      p.subheader-h2-I Услуги, стоимость, акции, отзывы
      p.p Здесь мы собрали весь наш опыт по направлениям лечения и услугам. Клиники, врачи, стоимость, акции, особенности лечения, сроки прибывания, описание технологий и развёрнутые отзывы наших клиентов по конкретным направлениям.

  .action-wrap
    h3.h3 Поиск по разделам
    h3.h3.second Смотрите так же
    .search
      .input-wrap
        SearchBox
      .btn-wrap
        Button(size='mini' text="Найти" on:click!='{showSearchMenu}')
    .buttons
      .btn-wrap
        Button(size='mini' href='/promotion/' iconR='arrow-r' text="Акции")
      .btn-wrap
        Button(size='mini' href='/clinics/' iconR='arrow-r' text="Клиники")

  BranchesMenu

.also_block
  h3.h3 Смотрите так же
  .wrapper
    Button(size='regular' href='./promotion' iconR='arrow-r' text="Акции")
    Button(size='regular' href='./clinics' iconR='arrow-r' text="Клиники")

CardWrapper
  .wiki_card
    .illustration
    .text-wrap
      h2.h2-I Вопрос — ответ
      p.p Мы собрали ответы на самые популярные вопросы. Найдите ответы или задайте свой вопрос
      Button(size='regular' href='/wiki' iconR='arrow-r' text="Вопрос-ответ")

.clinics_block
  CardWrapper
    .text-wrap
      h2.h2-I Клиники
      p.p Мы сотрудничаем со множеством клиник по всему миру, что даёт вам возможность делать выбор в широком диапазоне стран, цен и технологий лечения
      Button(size='regular' href='/clinics' iconR='arrow-r' text="Все клиники")
    Clinics( data='{DATA}')

CardWrapper
  .about_block
    h2.h2-I О компании
    p.subheader-h2-I Рассказываем о нашей работе
    p.p Мы работаем с 2013 года. За это время перевезли более пяти тысяч пациентов, перевели тысячи листов медицинской документации, провели сотни часов онлайн-консультаций. Мы знаем как подобрать клинику, врача, подготовить документы, забронировать удобную гостиницу и другие тонкости организации поездки.

    .video_placeholder(on:click!='{() => showVideoModal = !showVideoModal}')

    Popup(header='О компании' bind:show!='{ showVideoModal }')
      .video_container
        iframe.video( title="youtube" allowfullscreen="true" src="//www.youtube.com/embed/ZiBMvF9zdhE" frameborder="0" )

    .KTO-wrapper
      .illustration
      p Сотрудничаем с Южнокорейской организацией по туризму



Quote

CardWrapper
  CallToAction(
    contact = '{contact}'
    header='Консультируем онлайн'
    text='Напишите или позвоните. Расскажите о вашей проблеме, опишите диагноз, задайте вопросы, узнайте условия, сроки и стоимость'
    btnText='Открыть чат'
  )

CardWrapper
  .address_card
    .illustration
    .text-wrap
      h2.h2-I Контакты
      p.p Организуем лечение из любого города России, Казахстана или Кыргызстана
      Button(size='regular' href='/contacts/' iconR='arrow-r' text="Контакты")
</template>


<style lang='postcss'>
@import "../style/mixins.sss"

.head_block
  display: grid
  grid-auto-flow: row
  padding:
    top: 50px
    left: 15px
    right: 15px

  @media( width >= 800px )
    grid-template-columns: calc(50% - 30px) calc(50% - 30px)
    grid-gap: 60px

  @media( width >= 900px )
    padding:
      top: 120px

  .logotype
    display: block
    height: 187px
    margin-bottom: 30px
    background-position: center
    background-repeat: no-repeat
    background-size: contain
    background-image: url('/illustration/logotype--m.svg')

    @media( width > 800px )
      background-image: url('/illustration/logotype--d.svg')
      min-width: 250px
      max-width: 350px
      height: unset
      background-position: top
      margin-top: 10px
      margin-left: -50px

    @media( width > 900px )
      min-width: 280px
      margin-left: 0

  .text-block
    display: flex
    flex-direction: column
    align-items: center

    @media( width > 800px)
      align-items: start

    h1
      font-size: 50px
      line-height: 90%
      margin-bottom: 40px
      text-align: center

      @media( width > 800px )
        text-align: left

    .p-large
      text-align: center
      max-width: 400px
      margin-bottom: 40px

      @media( 600px > width > 800px )
        margin-bottom: 60px

      @media( width > 800px )
        text-align: left

    .tel_wrapper
      display: flex
      flex-direction: column
      padding: 15px 40px
      align-items: center

      @media( width > 800px )
        align-items: start
        padding: 15px


      .info
        font-style: normal
        font-weight: normal
        font-size: 13px
        line-height: 120%
        text-align: center
        color: var(--color--txt--small)
        margin-bottom: 10px
        padding-bottom: 7px
        @mixin divider_bottom

      .button-wrap
        margin-bottom: 15px
        @media( width > 650px )
          margin-bottom: 0

      .phone-number
        font-style: normal
        font-weight: bold
        font-size: 33px
        line-height: 85%
        margin-bottom: 20px
        text-align: center
        text-decoration: none
        color: var(--color--txt--headers)

        @media( width < 380px )
          font-size: 27px


.find_block
  display: flex
  flex-direction: column
  padding:
    top: 100px
    left: 15px
    right: 15px
    bottom: 50px

  .head_wrapper
    display: grid
    grid-template: auto auto / auto
    justify-content: center

    @media( width > 800px )
      grid-template: auto / calc(65% - 30px) calc(35% - 30px)
      grid-column-gap: 60px

    .illustration
      background-position: center
      background-repeat: no-repeat
      background-size: contain
      background-image: url('/illustration/find.svg')
      height: 140px
      width: 100%
      margin-bottom: 20px

      @media( width > 800px )
        grid-area: 1 / 2
        align-self: center
        height: 160px
        margin-bottom: 0

    .texts-wrap
      .h2-I, .subheader-h2-I
        text-align: center

        @media( width > 800px )
          text-align: left

      .p
        margin:
          top: 20px
          right: 60px

        @media( width < 800px )
          display: none


  .action-wrap
    padding:
      top: 25px
      right: 15px
      bottom: 30px
      left: 15px

    @media( width > 650px )
      display: grid
      grid-template-columns: 1fr auto
      grid-row-gap: 20px
      grid-column-gap: 40px
      padding:
        top: 60px
        right: 0
        bottom: 40px
        left: 0

    @media( width > 900px )
      max-width: 80%

    .search,
    .buttons
      display: flex
      align-items: center

    .h3,
    .search .btn-wrap,
    .buttons
      @media( width <= 650px )
        display: none

    .btn-wrap:first-child
      margin-right: 20px
    .input-wrap
      margin-right: 10px
    .input-wrap
      width: 100%


.also_block
  display: flex
  flex-direction: column
  align-items: center
  padding: 0 15px 50px
  @media( width > 650px )
    display: none

  h3
    margin-bottom: 20px

  .wrapper
    display: grid
    grid-auto-flow: column
    column-gap: 20px


.wiki_card
  display: grid
  grid-auto-flow: row
  justify-items: center
  padding:
    top: 30px
    right: 30px
    bottom: 50px
    left: 30px

  @media( width < 800px )
    @mixin cards_decor__white

  @media( 650px < width < 800px )
    grid-template-columns: calc(40% - 20px) calc(60% - 20px)
    justify-items: left
    grid-gap: 40px
    padding:
      top: 30px
      bottom: 30px

  @media( width > 800px )
    grid-template: 1fr / repeat(2, calc(50% - 30px))
    align-items: center
    grid-gap: 60px
    padding:
      top: 80px
      bottom: 80px

  .illustration
    display: block
    height: 156px
    width: 293px
    margin-bottom: 20px
    background-position: center
    background-repeat: no-repeat
    background-size: contain
    background-image: url('/illustration/wiki-s.svg')

    @media( 650px < width < 1000px )
      height: 100%
      width: 120%
      margin-left: -7%

    @media( width > 1000px )
      background-image: url('/illustration/wiki.svg')
      height: 130%
      width: 110%


  .text-wrap
    display: flex
    flex-direction: column
    align-items: center

    @media( width > 650px )
      align-items: flex-start

    .h2-I
      margin-bottom: 10px
      @media( width < 800px )
        font-size: 30px
        line-height: 30px

      @media( width > 800px )
        margin-bottom: 15px

    .p
      margin-bottom: 30px
      max-width: 400px
      text-align: center
      color: var(--color--txt--p)
      @media( width > 650px )
        text-align: left

.clinics_block
  @media( width < 800px )
    display: none

  .text-wrap
    max-width: 600px
    display: grid
    grid-auto-flow: row
    justify-items: left
    margin-bottom: 40px

    .h2-I
      margin-bottom: 15px

    .p
      text-align: left
      margin-bottom: 20px

.about_block
  display: grid
  grid-template: 4fr / 1fr
  justify-items: center
  padding:
    top: 50px
    right: 15px
    bottom: 0
    left: 15px

  &::after
    content: ''
    margin-top: 50px
    width: 70%
    @mixin devider

  @media( width > 650px )
    grid-template: 1fr / auto 30%
    grid-column-gap: 80px
    justify-items: start
    padding:
      bottom: 50px
    &::after
      display: none

  @media( width > 800px )
    grid-column-gap: 120px
    padding:
      top: 100px
      bottom: 50px

  .h2-I
    @media( width > 650px )
      grid-area: 1 / span 2
      font-size: 38px
      line-height: 38px
      margin-bottom: 15px

  .subheader-h2-I
    margin-bottom: 30px
    @media( width > 650px )
      display: none

  .p
    margin-bottom: 15px
    @media( width <= 650px )
      display: none

  .video_placeholder
    position: relative
    border-radius: 22px
    cursor: pointer
    max-width: 360px
    width: 100%
    height: calc( 360px / 2 )
    margin-bottom: 50px
    background-position: center
    background-repeat: no-repeat
    background-size: cover
    background-image: url('/video-cover.jpg')

    @media( width > 650px )
      height: 130px
      grid-area: span 2/2
      margin-bottom: 0


    &::after
      content: url('/icons/special/play.svg')
      position: absolute
      top: calc(50% - 25px)
      left: calc(50% - 25px)

  .KTO-wrapper
    display: flex
    flex-direction: column
    align-items: center
    @media( width > 650px )
      flex-direction: row-reverse

    .illustration
      background-size: contain
      background-repeat: no-repeat
      background-position: center
      background-image: url('/illustration/kto-logotype.svg')
      height: 95px
      width: 100%
      margin-bottom: 10px
      @media( width > 650px )
        width: 120px
        margin-bottom: 0
        flex: 1

    p
      font-size: 14px
      text-align: center
      color: var(--LIGHT-BLACK)
      max-width: 250px

      @media( width > 650px )
        flex: 1
        text-align: left
        margin-right: 20px
        padding-top: 10px
        padding-bottom: 10px
        max-width: 200px
        @mixin divider_right

.address_card
  display: grid
  grid-auto-flow: row
  justify-items: center
  overflow: hidden
  padding:
    top: 30px
    right: 30px
    bottom: 50px
    left: 30px

  @media( width < 800px )
    @mixin cards_decor__white

  @media( 650px < width < 800px )
    grid-template-columns: calc(40% - 20px) calc(60% - 20px)
    justify-items: left
    grid-gap: 40px
    padding:
      top: 30px
      bottom: 30px

  @media( width > 800px )
    grid-template: 1fr / repeat(2, calc(50% - 30px))
    align-items: center
    grid-gap: 60px
    padding:
      top: 80px
      bottom: 80px

  .illustration
    display: block
    height: 156px
    width: 293px
    margin-bottom: 20px
    background-position: center
    background-repeat: no-repeat
    background-size: contain
    background-image: url('/illustration/address.svg')

    @media( width > 650px  )
      background-position: left
      height: 125%
      width: 100%

    @media( width > 900px  )
      background-position: center


  .text-wrap
    display: flex
    flex-direction: column
    align-items: center

    @media( width > 650px )
      align-items: flex-start

    .h2-I
      margin-bottom: 10px

      @media( width < 800px )
        font-size: 30px
        line-height: 30px

      @media( width > 800px )
        margin-bottom: 15px

    .p
      margin-bottom: 30px
      max-width: 400px
      text-align: center
      color: var(--color--txt--p)
      @media( width > 650px )
        text-align: left

.video_container
  position: relative
  width: 100%
  height: 0
  padding-bottom: 56.25%
  &:after
    content: 'Загрузка видео…'
    font-size: 22px
    @media( width < 650px )
      font-size: 16px

.video
  position: absolute
  top: 0
  left: 0
  width: 100%
  height: 100%
</style>
