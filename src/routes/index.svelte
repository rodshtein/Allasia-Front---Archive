<script >

  import { query } from "svelte-apollo";
  import { client } from "../utils";
  import { BRANCHES, QUOTE_COUNT } from '../queries';

  let branchesQuery = query(client, { query: BRANCHES });


  // components
  import Tel from '../components/Tel.svelte';
  import SearchBox from '../components/Search-box.svelte';
  import Button from '../components/Button.svelte';
  import BranchesMenu from '../components/Branches-menu.svelte';
  import Quote from '../components/Quote.svelte';
  import CardWrapper from '../components/Card-wrapper.svelte';
</script>


<template lang='pug'>

svelte:head
  title Аллазия, лечение за рубежом

.head_block
  .logo_block
    img.logo(alt="plane illustration" src="illustration/plane.svg")
    img.logotype(alt="logotype" src="icons/special/logo.svg")

  h1.h1-I Лечение<br>за рубежом
  p.subheader-h1-I Подобираем выгодные условия, консультируем с известными врачами. Организуем поездку на всех этапах. Сотрудничаем с клиниками по всему миру, поэтому наши услуги — бесплатны.
  .tel_wrapper
    Tel(align="center")

.find_block
  .head_wrapper
    img(alt="Поиск клиники" src="illustration/find.svg")
    h2.h2-I Подбор лечения
    .subheader-h2-I Услуги, стоимость, акции, отзывы

  .search_wrapper
    SearchBox

BranchesMenu('{branchesQuery}')

.also_block
  h3.h3 Смотрите так же
  .wrapper
    Button(size='regular' href='#' iconR='arrow-r' text="Акции")
    Button(size='regular' href='#' iconR='arrow-r' text="Клиники")

CardWrapper
  .white_card
    img(alt="Вопрос-ответ" src="illustration/wiki-s.svg")
    h2.h2-I Вопрос — ответ
    p.p-I Мы собрали ответы на самые популярные вопросы. Найдите ответы или задайте свой вопрос
    Button(size='regular' href='#' iconR='arrow-r' text="Вопрос-ответ")

.about_block
  h2.h2-I О компании
  .subheader-h2-I Рассказываем о нашей работе
  .video_placeholder
    img.cover(alt="Видео о компании" src="video-cover.jpg")
    img.play-btn(alt="Видео о компании" src="icons/special/play.svg")
  .KTO-wrapper
    img(alt="Чат" src="illustration/kto-logotype.svg")
    p Сотрудничаем с Южнокорейской организацией по туризму

.devider

Quote

CardWrapper
  .white_card
    img(alt="Адреса и контакты" src="illustration/address.svg")
    h2.h2-I Контакты
    .p-I Организуем лечение из любого города России, Казахстана или Кыргызстана
    Button(size='regular' href='#' iconR='arrow-r' text="Контакты")

</template>


<style lang='postcss'>
@import "../style/mixins.sss"
.head_block
  display: flex
  flex-direction: column
  padding:
    top: 50px
    left: 15px
    right: 15px

  .logo_block
    display: flex
    flex-direction: column
    align-items: center
    margin-bottom: 30px

    .logo
      max-width: 210px

    .logotype
      max-width: 310px

  h1
    margin-bottom: 30px

  p
    margin-bottom: 30px


h1, h2,
.subheader-h1-I,
.subheader-h2-I
  text-align: center

.tel_wrapper
  display: flex
  justify-content: center
  padding: 15px
  @mixin cards_decor__withe

.find_block
  display: flex
  flex-direction: column
  padding: 0 15px

  .head_wrapper
    display: flex
    flex-direction: column
    align-items: center
    padding-top: 50px
    padding-left: 15px
    padding-right: 15px

    img
      align-self: center
      margin-bottom: 20px

  .search_wrapper
    padding: 25px 15px 30px

.also_block
  display: flex
  flex-direction: column
  align-items: center
  padding: 0 15px 50px

  h3
    margin-bottom: 20px

  .wrapper
    display: grid
    grid-auto-flow: column
    column-gap: 20px


.white_card
  display: flex
  flex-direction: column
  align-items: center
  padding: 30px 15px 50px
  @mixin cards_decor__withe
  img
    margin-bottom: 20px
  .h2-I
    margin-bottom: 10px
  .p-I
    margin-left: 15px
    margin-right: 15px
    margin-bottom: 30px
    text-align: center

.about_block
  display: flex
  flex-direction: column
  padding: 50px 15px 30px


  .subheader-h2-I
    margin-bottom: 30px

  .video_placeholder
    position: relative
    display: flex
    border-radius: 22px
    overflow: hidden
    width: 80%
    align-self: center
    margin-bottom: 50px

    .cover
      width: 100%

    .play-btn
      position: absolute
      top: calc(50% - 25px)
      left: calc(50% - 25px)


  .KTO-wrapper
    display: flex
    flex-direction: column
    align-items: center

    img
      height: 95px
      margin-bottom: 10px

    p
      font-size: 14px
      text-align: center
      color: var(--LIGHT-BLACK)
      max-width: 250px

.devider
  margin: 0 15px


</style>
