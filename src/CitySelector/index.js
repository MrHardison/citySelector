require('./style.less');
// Your code...

import $ from 'jquery';
import SelectorFunctions from "./CitySelector"


window.jQuery = $;
window.$ = $;

export default class CitySelector{
	constructor(data){
		this.data = data;
		this.destroy(data);
		this.selected_region = '';
		
		$('#citySelector').append('<button id="selectRegion">Выбрать регион</button>')
		$('#info').show();
		/* this.select_region(); */
		
		$('#selectRegion').on('click', (e) => {
			let $this = $(e.currentTarget);
			$('#citySelector').html('<ul class="regions"></ul>');
			$.ajax({
				url: data.regionsUrl,
				context: $('#citySelector'),
				success: (data) => {
					this.show_regions(data);
				}
			});
		});
		
		$('#citySelector').on('click','.regions .item', (e) => {
			let $this = $(e.currentTarget);
			if(!$this.hasClass('selected')) {
				$('#citySelector .item').removeClass('selected');
				$this.addClass('selected');
				var region_id = $this.data('id');
				this.selected_region = region_id;
			}
			if(('#save_city').length) {
				$('#save_city').attr('disabled', true);
			}
			$.ajax({
				url: this.data.localitiesUrl + '/' + region_id,
				context: $this,
				success: (data) => {
					this.show_cities(data);
				}
			});
		});

		$('#citySelector').on('click', '.cities .item', (e) => {
			let $this = $(e.currentTarget);
			if (!$this.hasClass('selected')) {
				$('#citySelector .cities .item').removeClass('selected');
				$this.addClass('selected');
				$('#localityText').html($this.html());
				if ($('#save_city').length === 0) {
					$('#citySelector').append('<button id="save_city">Сохранить</button>');
				}
				$('#save_city').attr('disabled', false);
			}
		});
	}

	
	destroy(data){
		$('#destroyCitySelector').on('click',() => {
			$('#localityText').text('');
			$('#regionText').text('');
			$('#info').hide();
			$('#' + data.elementId).html('');

		})
	}
	
	show_regions(data) {
		$.each(data, (i, item) => {
			$('#citySelector .regions').append('<li class="item" data-id = '+ item['id'] +' >'+ item['title'] +'</li>');
		});
		$('#citySelector').append('<ul class="cities"></ul>');
	}
	
	show_cities(data) {
		$('#citySelector').find('.cities').html('');
		$.each(data.list, (i, item) => {
			$('#citySelector').find('.cities').append('<li class="item">'+ data.list[i] +'</li>');
		});
		$('.info__text').find('#regionText').html(data.id);
	}
	
	
}

/* export default class SelectorFunctions {
	constructor(data) {
		this.data = data;
		
		
		$("#selectRegion").off('click').on("click", () => {
			$("#" + data.elementId).html('');
			$.ajax({
				url: data.regionsUrl,
				context: $("#" + data.elementId),
				success: (data) => {
					this.showRegions(data);
				}
			});
		});
		
	}
};
*/