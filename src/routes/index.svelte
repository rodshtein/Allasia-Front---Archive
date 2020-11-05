<script context="module">
  import { onMount } from 'svelte';
  import { client } from '../utils';
  import { INDEX_CLINICS } from '../queries';

  export async function preload() {

    let query = await client.query({
        query: INDEX_CLINICS,
        variables: {
          first: 30
        }
      });

    return {
      DATA: query.data,
      CLINICS: query.data.allClinics,
    };
  }

</script>


<script >
  export let DATA;
  export let CLINICS;

  // set preloaded data to chache
  onMount(()=> {
    client.writeQuery({
      query: INDEX_CLINICS,
      data: DATA
    })
    console.log(CLINICS)
  });

  // components
  import SearchBox from '../components/Search-box.svelte';
  import Button from '../components/Button.svelte';
  import BranchesMenu from '../components/Branches-menu.svelte';
  import Quote from '../components/Quote.svelte';
  import CardWrapper from '../components/Card-wrapper.svelte';
  import Clinics from '../components/Index-clinics.svelte';
  import CallToAction from '../components/Call-to-action.svelte';
</script>


<template lang='pug'>

svelte:head
  title Аллазия, лечение за рубежом

.head_block
  .logotype(alt="logotype" src="icons/special/logo.svg")

  .text-block
    h1.h1-I Лечение<br>за рубежом
    p.subheader Подбираем выгодные условия, консультируем с известными врачами. Организуем поездку на всех этапах. Сотрудничаем с клиниками по всему миру, поэтому наши услуги — бесплатны.
    .tel_wrapper
      .info Единый, бесплатный номер в РФ
      .phone-number 8 800 250 82 97
      .button-wrap
        Button(size='mini' iconR='short_arrow-b' text="Номера представительств")

.find_block
  .head_wrapper
    img(alt="Поиск клиники" src="illustration/find.svg")
    .texts-wrap
      h2.h2-I Подбор лечения
      .subheader-h2 Услуги, стоимость, акции, отзывы
      p.p-I Здесь мы собрали весь наш опыт по направлениям лечения и услугам. Клиники, врачи, стоимость, акции, особенности лечения, сроки прибывания, описание технологий и развёрнутые отзывы наших клиентов по конкретным направлениям.

  .action-wrap
    .search-wrap
      h3.h3 Поиск по разделам
      .search-wrap2
        SearchBox
        .btn-wrap
          Button(size='mini' text="Найти")

    .also
      h3.h3 Смотрите так же
      .wrap
        Button(size='mini' href='#' iconR='arrow-r' text="Акции")
        Button(size='mini' href='#' iconR='arrow-r' text="Клиники")

  BranchesMenu

.also_block
  h3.h3 Смотрите так же
  .wrapper
    Button(size='regular' href='#' iconR='arrow-r' text="Акции")
    Button(size='regular' href='#' iconR='arrow-r' text="Клиники")

CardWrapper
  .wiki_card
    .illustration
    .text-wrap
      h2.h2-I Вопрос — ответ
      p.p-I Мы собрали ответы на самые популярные вопросы. Найдите ответы или задайте свой вопрос
      Button(size='regular' href='#' iconR='arrow-r' text="Вопрос-ответ")

CardWrapper
  .clinics_block
    .text-wrap
      h2.h2 Клиники
      .subheader Мы сотрудничаем с множеством клиник по всему миру, что даёт вам возможность делать выбор в широком диапазоне стран, цен и технологий лечения
      Button(size='regular' href='#' iconR='arrow-r' text="Все клиники")
    Clinics( data='{CLINICS}')

CardWrapper
  .about_block
    h2.h2-I О компании
    .subheader-h2-I Рассказываем о нашей работе

    .middle-wrap
      .subheader-full Мы сотрудничаем с множеством клиник по всему миру, что даёт вам возможность делать выбор в широком диапазоне стран, цен и технологий лечения
      .video_placeholder
        img.cover(alt="Видео о компании" src="video-cover.jpg")
        img.play-btn(alt="Видео о компании" src="icons/special/play.svg")

      .KTO-wrapper
        img(alt="Чат" src="illustration/kto-logotype.svg")
        p Сотрудничаем с Южнокорейской организацией по туризму

Quote

CallToAction(
  header='Консультируем онлайн'
  text='Напишите или позвоните. Расскажите о вашей проблеме, опишите диагноз, задайте вопросы, узнайте условия, сроки и стоимость'
  btnText='Заполнить заявку'
  tel
)

CardWrapper
  .address_card
    .illustration
    .text-wrap
      h2.h2-I Контакты
      p.p-I Организуем лечение из любого города России, Казахстана или Кыргызстана
      Button(size='regular' href='#' iconR='arrow-r' text="Контакты")

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

  @media( width > 800px )
    grid-auto-flow: column
    grid-gap: 50px

  @media( width > 900px )
    grid-gap: 80px

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

    .h1-I
      margin-bottom: 30px
      text-align: center

      @media( width > 800px )
        text-align: left

    .subheader
      font-size: 18px
      line-height: 120%
      text-align: center
      max-width: 400px
      margin-bottom: 30px
      color: var(--LIGHT-BLACK)

      @media( 600px > width > 800px )
        margin-bottom: 60px

      @media( width > 800px )
        text-align: left

    .tel_wrapper
      display: flex
      flex-direction: column
      padding: 15px 40px

      @mixin cards_decor__withe
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
        color: var(--color--txt---light-blue)
        margin-bottom: 10px
        padding-bottom: 7px
        @mixin devider_border_bottom

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
    display: flex
    flex-direction: column
    align-items: center
    padding:
      left: 15px
      right: 15px

    @media( width > 800px )
      flex-direction: row-reverse
      justify-content: space-between
      padding: 0

    .texts-wrap
      max-width: 460px

      h2
        font-size: 30px
        line-height: 100%

        @media( width > 650px )
          font-size: 38px

        @media( width > 800px )
          text-align: left

      h2, .subheader-h2
        text-align: center

        @media( width > 800px )
          text-align: left

      .p-I
        margin:
          top: 20px
          right: 60px

        @media( width < 800px )
          display: none

    img
      max-width: 179px
      align-self: center
      margin-bottom: 20px

      @media( width > 900px )
        max-width: 230px
        flex: 1

  .action-wrap
    padding:
      top: 25px
      right: 15px
      bottom: 30px
      left: 15px

    @media( width > 550px )
      display: flex
      padding:
        top: 60px
        right: 0
        bottom: 20px
        left: 0

    @media( width > 800px )
      max-width: 80%

    .search-wrap
      @media( width > 550px )
        flex: 1 1 auto
        margin-right: 40px

      .search-wrap2
        display: grid
        grid-template-columns: 1fr 0fr
        grid-column-gap: 10px
        align-items: center

      .btn-wrap
        @media( width <= 800px )
          display: none

    .h3
      margin-bottom: 20px
      @media( width <= 550px )
        display: none

    .also
      @media( width <= 550px )
        display: none

      .wrap
        display: grid
        grid-auto-flow: column
        grid-gap: 20px
        padding:
          top: 2px
          bottom: 2px

.also_block
  display: flex
  flex-direction: column
  align-items: center
  padding: 0 15px 50px
  @media( width > 550px )
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
    @mixin cards_decor__withe

  @media( 650px < width < 800px )
    grid-auto-flow: column
    justify-items: left
    grid-gap: 20px
    padding:
      top: 30px
      bottom: 30px

  @media( width > 800px )
    grid-auto-flow: column
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

    @media( 650px < width < 800px )
      background-position: top
      height: 100%
      width: 233px

    @media( width > 1000px )
      background-image: url('/illustration/wiki.svg')
      height: 239px
      width: 370px


  .text-wrap
    display: flex
    flex-direction: column
    align-items: center

    @media( width > 650px )
      align-items: flex-start

    .h2-I
      margin-bottom: 10px
      @media( width > 800px )
        margin-bottom: 15px
        font-size: 38px
        line-height: 38px

    .p-I
      margin-bottom: 30px
      max-width: 400px
      text-align: center
      color: var(--color--p-I)
      @media( width > 650px )
        text-align: left
      @media( width > 800px )
        font-size: 17px
        line-height: 22px


.clinics_block
  @media( width < 800px )
    display: none

  .text-wrap
    max-width: 600px
    display: grid
    grid-auto-flow: row
    justify-items: left
    margin-bottom: 40px

    .h2
      font-size: 38px
      line-height: 38px
      margin-bottom: 15px

    .subheader
      font-size: 17px
      line-height: 22px
      text-align: left
      margin-bottom: 20px
      color: var(--color--p-I)


.white_card
  display: flex
  flex-direction: column
  align-items: center
  padding: 30px 15px 50px

  @media( width < 800px )
    @mixin cards_decor__withe

  img
    margin-bottom: 20px
  .h2-I
    margin-bottom: 10px
  .p-I
    margin-left: 15px
    margin-right: 15px
    margin-bottom: 30px
    max-width: 400px
    text-align: center


.about_block
  display: grid
  grid-auto-flow: row
  justify-items: center
  padding:
    padding-top: 50px
    padding-right: 15px
    padding-bottom: 30px
    padding-left: 15px

  @media( width > 650px )
    justify-items: start

  @media( width > 800px )
    padding:
      top: 100px
      bottom: 50px

  .h2-I
    @media( width > 650px )
      font-size: 38px
      line-height: 38px
      margin-bottom: 15px

  .subheader-h2-I
    margin-bottom: 30px
    @media( width > 650px )
      display: none

  .middle-wrap
    width: 80%
    @media( width > 650px )
      grid-template: 2fr / 2fr
      grid-row-gap: 15px
      grid-column-gap: 30px
      display: grid
      width: 100%

    .subheader-full
      flex: 1 1 auto
      margin-right: 50px
      margin-bottom: 0
      font-size: 17px
      line-height: 22px
      text-align: left
      color: var(--color--p-I)
      @media( width < 650px )
        display: none

    .video_placeholder
      position: relative
      display: flex
      border-radius: 22px
      overflow: hidden
      width: 100%
      align-self: center
      margin-bottom: 50px
      @media( width > 650px )
        grid-area: span 2/2
        align-self: start
        margin-bottom: 0


      .cover
        width: 100%

      .play-btn
        position: absolute
        top: calc(50% - 25px)
        left: calc(50% - 25px)


  .KTO-wrapper
    justify-self: left
    display: flex
    flex-direction: column
    align-items: center
    @media( width > 650px )
      flex-direction: row-reverse

    img
      height: 95px
      margin-bottom: 10px
      @media( width > 650px )
        height: 70px
        margin-bottom: 0

    p
      font-size: 14px
      text-align: center
      color: var(--LIGHT-BLACK)
      max-width: 250px
      @media( width < 650px )
        padding-bottom: 50px
        @mixin devider_border_bottom

      @media( width > 650px )
        text-align: left
        margin-right: 20px
        padding-right: 20px
        padding-top: 10px
        padding-bottom: 10px
        max-width: 200px
        @mixin devider_border_right

.address_card
  display: grid
  grid-auto-flow: row
  justify-items: center
  padding:
    top: 30px
    right: 30px
    bottom: 50px
    left: 30px

  @media( width < 800px )
    @mixin cards_decor__withe

  @media( 650px < width < 800px )
    grid-auto-flow: column
    justify-items: left
    grid-gap: 20px
    padding:
      top: 30px
      bottom: 30px

  @media( width > 800px )
    grid-auto-flow: column
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

    @media( 650px < width < 800px )
      background-position: top
      height: 100%
      width: 233px

    @media( width > 1000px )
      height: 239px
      width: 370px


  .text-wrap
    display: flex
    flex-direction: column
    align-items: center

    @media( width > 650px )
      align-items: flex-start

    .h2-I
      margin-bottom: 10px
      @media( width > 800px )
        margin-bottom: 15px
        font-size: 38px
        line-height: 38px

    .p-I
      margin-bottom: 30px
      max-width: 400px
      text-align: center
      color: var(--color--p-I)
      @media( width > 650px )
        text-align: left
      @media( width > 800px )
        font-size: 17px
        line-height: 22px


</style>
