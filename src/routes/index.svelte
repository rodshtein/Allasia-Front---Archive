<script context="module">
  // Here we import the graphql client
  import { apollo } from "../utils";
  import { gql } from "apollo-boost";

  const ALLDOCTORS = gql`
    query {
      allDoctors (first: 2) {
          name
          avatar {
            publicUrl
          }
      }
    }
  `;

  export async function preload() {
    return {
      cache: await apollo.query({
        query: ALLDOCTORS
      })
    };
  }
</script>

<script>
  // components
  import Tel from '../components/Tel.svelte';
  import SearchBox from '../components/SearchBox.svelte';
  import Button  from '../components/Button.svelte';

  import { onMount } from "svelte";
  import { setClient, restore, query } from "svelte-apollo";
  export let cache; // this matches the return value of `preload` above
  restore(apollo, ALLDOCTORS, cache.data);

  let docQuery = query(apollo, { query: ALLDOCTORS });

  onMount(() => { setClient(apollo) });

  $: loading = docQuery.loading;
  $: text = loading ? "Loading..." : "Great success!";
</script>


<template lang='pug'>

svelte:head
  title Аллазия, лечение за рубежем

div(style='display: flex; flex-direction: column; align-items: center;gap: 20px')
  Button( href='#' iconR='arrow-r' iconL='arrow-r' ) Вопрос-ответ
  Button( invert iconL='search' ) Вопрос-ответ

  Button( href='#' type='mini' iconR='arrow-r' ) Вопрос-ответ
  Button( type='mini' invert  iconR='chat' ) Вопрос-ответ


.head_block
  .logo_block
    img.logo(alt="plane illustration" src="illustration/plane.svg")
    img.logotype(alt="logotype" src="icons/special/logo.svg")

  h1.h1-I Лечение<br>за рубежом
  p.subheader-h1-I Подобираем выгодные условия, консультируем с известными врачами. Организуем поездку на всех этапах. Сотрудничаем с клиниками по всему миру, поэтому наши услуги — бесплатны.
.tel_wrapper
  Tel
.find_block
  .head_wrapper
    img(alt="Поиск клиники" src="illustration/find2.svg")
    h2.h2-I Подбор лечения
    .subheader-h2-I Услуги, стоимость, акции, отзывы

  .search_wrapper
    SearchBox

  .menu_wrapper

  .also_wrapper
    h3.h3 Смотрите так же
    .wrapper
      Button(type='regular' iconR='arrow-b---short' iconL='x') Акции
      Button(type='regular' href='#' iconR='arrow-r' iconL='arrow-l') Клиники

.white_card
  img(alt="Вопрос-ответ" src="illustration/wiki5-s.svg")
  .wrapper
    h2.h2-I Вопрос — ответ
    .subheader-h2-I Мы собрали ответы на самые популярные вопросы. Найдите ответы или задайте свой вопрос
    Button(type='regular' iconR='arrow---r') Вопрос-ответ

.about_block
  h2.h2-I О компании
  .subheader-h2-I Рассказываем о нашей работе
  .video_placeholder
    img.cover(alt="Видео о компании" src="video-cover.jpg")
    img.play-btn(alt="Видео о компании" src="icons/special/play.svg")
  .devider
  .KTO-wrapper
    img(alt="Чат" src="illustration/KTO-logotype.svg")
    p Сотрудничаем с Южнокорейской организацией по туризму
  .devider

.white_card
  img(alt="Адреса и контакты" src="illustration/Address.svg")
  .wrapper
    h2.h2-I Контакты
    .subheader-h2-I Организуем лечение из любого города России, Казахстана или Кыргызстана
  Button(type='regular' iconR='arrow---r') Вопрос-ответ




//-
  +await('$docQuery')
    p Loading...
    +then('result')
      ul
        +each('result.data.allDoctors as doc')
          li {doc.name}
            +if('doc.avatar')
              img(
                class="avatar"
                alt="Loading Borat..."
                src="{doc.avatar.publicUrl}"
              )
    +catch('error')
      pre {error}

</template>


<style lang='postcss'>
@import "../style/mixins.sss"
.head_block
  display: flex
  flex-direction: column
  padding: 50px 15px

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

h1, .h2, .subheader-h1-I
  text-align: center

.tel_wrapper
  display: flex
  justify-content: center

.find_block
  display: flex
  flex-direction: column
  padding: 15px 15px

  .head_wrapper
    display: flex
    flex-direction: column
    align-items: center
    padding-top: 30px
    padding-left: 15px
    padding-right: 15px

    img
      align-self: center
      margin-bottom: 20px

    h2
      margin-bottom: 10px

  .search_wrapper
    padding: 25px 15px

  .menu_wrapper
    height: 150px

  .also_wrapper
    display: flex
    flex-direction: column
    align-items: center
    padding: 30px 15px

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
  padding: 50px 15px
  margin: 30px 0
  @mixin cards_decor__withe

  .wrapper
    padding: 30px 20px

  .h1
    margin-bottom: 10px

.about_block
  display: flex
  flex-direction: column
  padding: 15px 15px

  .video_placeholder
    position: relative
    display: flex
    border-radius: 22px
    overflow: hidden
    width: 80%
    align-self: center

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
    gap: 20px

    img
      height: 120px



</style>
