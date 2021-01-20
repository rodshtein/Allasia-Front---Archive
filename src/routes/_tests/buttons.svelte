
<script>
	import Button from '../../components/Button.svelte';
</script>


<template lang="pug">

div(style='display: flex; flex-direction: column; align-items: center;gap: 20px; margin-top: 100px')
	Button( href='#' iconL='arrow-l' iconR='arrow-r' text='Вопрос-ответ')
	Button( href='#' iconL='arrow-l' invert iconR='search' text='Вопрос-ответ')
	Button( href='#' iconR='arrow-r')
	Button( invert iconL='search'  text='Вопрос-ответ' )

	Button( href='#' size='mini' iconR='arrow-r'  text='Вопрос-ответ' )
	Button( size='mini' invert  iconR='chat'  text='Вопрос-ответ' )
	Button( size='small' invert  iconR='chat'  text='Мелкая кнопка' )
</template>