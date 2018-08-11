require('./style.less');
// Your code...

import $ from 'jquery';

window.jQuery = $;
window.$ = $;

export default class CitySelector{
	constructor(data){
		this.data = data;
		this.destroy(data);
		this.selected_region = '';
		this.selected_city = '';
		this.saveUrl = data['saveUrl'];
		this.regionsUrl = data['regionsUrl'];
		this.localitiesUrl = data['localitiesUrl'];
		
		if($('#citySelector').html() == 0) {
			$('#citySelector').append('<button id="selectRegion">Выбрать регион</button>')
			$('#info').show();
		}
		
		$('#selectRegion').on('click', (e) => {
			let $this = $(e.currentTarget);
			$('#citySelector').html('<ul class="regions"></ul>');
			$.ajax({
				url: this.regionsUrl,
				context: $('#citySelector'),
				success: (response) => {
					this.show_regions(response);
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

				if(('#save_city').length) {
					$('#save_city').attr('disabled', true);
				}

				$.ajax({
					url: this.localitiesUrl + '/' + region_id,
					context: $this,
					success: (response) => {
						this.show_cities(response);
					}
				});
			}
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
				var city = $this.html();
				this.selected_city = city;
				$('#save_city').attr('disabled', false);
			}
		});

		$('#citySelector').on('click', '#save_city', () => {
			$.ajax({
				url: this.saveUrl,
				type: "POST",
				async: false,
				data: {
					city: this.selected_city,
					idRegion: this.selected_region,
				},
				success:(response) => {
					console.log(response);
				}
			});
		})
	}

	destroy(data){
		$('#destroyCitySelector').on('click',() => {
			$('#localityText').text('');
			$('#regionText').text('');
			$('#info').hide();
			$('#citySelector').html('');

		})
	}
	
	show_regions(response) {
		$.each(response, (i, item) => {
			$('#citySelector .regions').append('<li class="item" data-id = '+ item['id'] +' >'+ item['title'] +'</li>');
		});
		$('#citySelector').append('<ul class="cities"></ul>');
	}
	
	show_cities(response) {
		$('#citySelector').find('.cities').html('');
		$.each(response.list, (i, item) => {
			$('#citySelector').find('.cities').append('<li class="item">'+ response['list'][i] +'</li>');
		});
		$('.info__text').find('#regionText').html(response['id']);
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