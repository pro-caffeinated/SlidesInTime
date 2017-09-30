import { EventEmitter } from 'events';

import dispatcher from '../dispatcher'

class ImageListStore extends EventEmitter{
	constructor(){
		super()
		this.content = {
			'title': 'Enter title here', 
			'items': ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
						'Fusce rutrum lectus non tortor fringilla molestie.'],
			'src': 'http://via.placeholder.com/1920x1080'
		}
	}
	getContent(){
		return this.content;
	}

	createContent(title,list,src){
		this.content.title = title;
		this.content.items = list
		this.content.src = src
		this.emit('change')
	}

	createTitle(title){
		this.content.title = title;
		this.emit('change')
	}

	updateList(item){
		this.content.items.push(item)
		this.emit('change')
	}

	createImage(src){
		this.content.src = src
		this.emit('change')
	}

	clearContent(){
		this.content.title = '';
		this.content.items = []
		this.content.src = ''
		this.emit('change')
	}

	handleActions(action){
		// console.log('ImageListStore received an action', action)
		switch(action.type){
			case 'CREATE_TITLE':{
				this.createTitle(action.content.title)
				break;
			}
			
			case 'CREATE_IMAGE':{
				this.createImage(action.content.src)
				break;
			}

			case 'UPDATE_LIST':{
				this.updateList(action.content.item)
				break;
			}

			case 'CLEAR_CONTENT':{
				this.clearContent()
				break;
			}
		}
	}
} 

const imageListStore = new ImageListStore;
dispatcher.register(imageListStore.handleActions.bind(imageListStore))
window.dispatcher = dispatcher
export default imageListStore;