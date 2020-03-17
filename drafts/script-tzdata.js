var CustomWidget = function () {
		var self = this, system = self.system(), widgetTca = 'bizandsoft_tzdata', widgetPath = 'retask2', currentUser = $('.n-avatar').first().attr('id'), serverName = 'amo.bizandsoft.ru';

		function updateTime(parentEl){
			var tzone = $(parentEl).text().match(/GMT(.*?);/);
			var nowTime = new Date();
			var outTime;
			offsetTime = new Date().getTimezoneOffset();
			nowTime.setMinutes(nowTime.getMinutes() + offsetTime);
			offsetTime = +tzone[1] * 3600;
			nowTime.setSeconds(nowTime.getSeconds() + offsetTime);
			var nowMin = nowTime.getMinutes();
			if (nowMin < 10)
				nowMin = '0'+nowMin;
			outTime = nowTime.getHours() + ':' + nowMin;
			$(parentEl).find($("span")).text(outTime);
		}

		setInterval(function() {
			for(var i = 0; i < $(".bizandsoft_add-info").length; i++)
			{
				updateTime($(".bizandsoft_add-info")[i]);
			}
			}, 60000);

		function  addTime(time,number,workstate,country,tzone)
		{
			var lim = $('input[name="CFV[264647]"]').val();
			var now = new Date();
			var t = new Date(now.getFullYear(), now.getMonth(), now.getDate(), lim.slice(0,2), lim.slice(3,5),0, 0);
			var t1 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), time.slice(12,14), time.slice(15,17),0, 0);

			var shortTime = time.slice(-8,-3);

			var phoneFlds = $('input.control-phone__formatted');
			var phoneNum = number.slice(1);
			var divTime = '<span class="bizandsoft_add-info';
			//if (workstate===0)
				if (t1<=t)
				divTime = divTime + ' bizandsoft-state-false';
			var addDescr = '<table class="' + widgetTca + '_add_descr" style="margin-bottom:7px;">';
							if(country !== null)
							{
							addDescr = addDescr +'<tr class="' + widgetTca + '_country" style="border:0">\
							<td class="' + widgetTca + '_min_header">Страна:</td>\
							</tr>\
							<tr class="' + widgetTca + '_country" style="border-bottom:1px dotted #efefef;">\
								<td style="text-align:right;">\
									<table style="width:inherit;float:right;">\
										<tr>\
											<td  style="padding-left:3px;">\
											'+ country +'</td>\
										</tr>\
									</table>\
								</td>\
							</tr>';
							}
				addDescr = addDescr + '<tr class="' + widgetTca + '_ctime">\
							<td class="' + widgetTca + '_min_header">Текущее время:</td>\
							</tr>\
							<tr class="' + widgetTca + '_ctime">\
								<td style="text-align:right;">' + time.slice(0,10) + ' <span calss="sortTime">' + time.slice(12,17) +'</span><br>';
								if (tzone !==null)
									addDescr = addDescr + tzone;
								addDescr = addDescr + '</td>\
							</tr>\
						</table>';
			divTime = divTime + '">'+'<span calss="sortTime">'+shortTime+'</span>'+addDescr+'</span>';
			for(var i=0; i<phoneFlds.length; i++)
			{
				if (phoneFlds[i].value == phoneNum || phoneFlds[i].value.replace(/[\ \-]/g,"") == phoneNum)
				{
					$(phoneFlds[i]).parent().find(".bizandsoft_add-info").remove();
					$(phoneFlds[i]).parent().append(divTime);
				}
			}
        }

		this.callbacks = {
			settings: function(){
				console.log("settings");
				if($('.widget-settings__base-space').length > 0){
					var tcaWdgVersionStyleInc = 'margin-left: 1px;width: calc(100% - 2px);margin-bottom: -30px;margin-right:1px;background-color:#f4f4f4;';
					if($('body').find('.widget-state.widget-state_status_installed').length == 0){
						var widgetNotInstalled = true;
					}
				}else{
					var tcaWdgVersionStyleInc = 'margin-left: -30px;width: calc(100% + 60px);margin-bottom: -30px;margin-top: 10px;';
					if($('#widget_active__sw').length == 0){
						var widgetNotInstalled = true;
					}
				}
				if (typeof widgetNotInstalled !== 'undefined') {
					$('.widget_settings_block__fields').append('<div class="widget_settings_block__item_field"><label class="control-checkbox checkboxes_dropdown__label is-checked"><div class="control-checkbox__body"><input type="checkbox" class="js-item-checkbox" name="" id="' + widgetTca + '_accept" value="" data-value="1"><span class="control-checkbox__helper"></span></div><div class="control-checkbox__text element__text checkboxes_dropdown__label_title" style="white-space: normal;">Я подтверждаю согласие на передачу данных аккаунта amoCRM на сервера компании «Бизнес и софт» с целью обеспечения работоспособности виджета</div></label></div>');
				}
				$('.modal-body').append('<div style="' + tcaWdgVersionStyleInc + '"><table style="width:100%;border-top:3px solid #467ec2;"><tbody><tr><td style="width:200px;border: 0;padding-top:5px;padding-left:10px;padding-bottom: 10px;"><a href="https://bizandsoft.ru" target="_blank"><div style="width: 200px;height:50px;background-image:url(\'https://amo.bizandsoft.ru/assets/images/bizandsoft_logo.png\');background-repeat:no-repeat;background-size:contain;background-position: left center;"></div></a></td><td style="border: 0;vertical-align:middle;text-align:right;padding-right:15px;font-size:11pt;"><span style="font-weight: bold;">Остались вопросы? Будем рады помочь!</span><br><a href="mailto:amoprog@bizandsoft.ru" style="color: inherit;text-decoration: none;border-bottom: 1px solid #e5e5e5;">amoprog@bizandsoft.ru</a> <a href="tel:+74712773120" style="color: inherit;text-decoration: none;border-bottom: 1px solid #e5e5e5;">+7 (4712) 773-120</a></td></tr></tbody></table></div>');
				return true;
			},
			onSave: function () {
				console.log("onsave");
				return true;
			},
			init: function () {
				return true;
			},
			bind_actions: function () {
				$('.' + widgetPath + '-button').on('click', function () {
					$('.' + widgetTca + '_mgc-template-modal').remove();
					$searchForm = '\
					<form id="form">\
						<iframe src="https://' + serverName + '/' + widgetPath + '/index.php?\
							dom=' + window.location.hostname.split('.')[0] + '&\
							amouser=' + system.amouser + '&\
							amohash=' + system.amohash + '&\
							key=' + self.get_settings().widget_key + '&\
							current=' + currentUser + '" \
							style="width:100%;height:400px;">\
						</iframe>\
					</form>\
				</div>\
				<div id="' + widgetTca + '_result"></div>';
					$('body').append('\
				<div class="modal modal-list modal_print modal-action ' + widgetTca + '_mgc-modal">\
					<div class="modal-scroller custom-scroll">\
						<div class="modal-body modal-body-relative">\
							<div class="modal-body__inner">\
								<div class="' + widgetTca + '_sdk">\
									<div class="' + widgetTca + '-action__header">\
										<h2 class="' + widgetTca + '-action__caption head_2">Определение данных по номеру телефона</h2>\
										<div class="' + widgetTca + '-action__top-controls">\
											<button type="button" class="button-input button-cancel ' + widgetTca + '_bye">✕</button>\
										</div>\
									</div>\
									' + $searchForm + '\
								</div>\
							</div>\
						<div class="default-overlay modal-overlay default-overlay-visible">\
							<span class="modal-overlay__spinner spinner-icon spinner-icon-abs-center"style="display: none;"></span>\
						</div>\
					</div>\
				</div>\
			</div>');
					$('.' + widgetTca + '_mgc-modal .button-cancel').on('click', function () {
						$('.' + widgetTca + '_mgc-modal').remove();
					});
				});
				/*
					Нажата кнопка отправки сообщения.
				*/
				$('#' + widgetTca + '_action_check').on('click', function () {
					$('#' + widgetTca + '_preloader').css('display', '');
					$('.' + widgetTca + '_operator').css('display', 'none');
					$('.' + widgetTca + '_region').css('display', 'none');
					$('.' + widgetTca + '_country').css('display', 'none');
					$('.' + widgetTca + '_ctime').css('display', 'none');
					/*
						Сброс прошлых ошибок и подтверждений
					*/
					$('#' + widgetTca + '_info_error').fadeOut().empty();
					$('#' + widgetTca + '_info_succeed').fadeOut().empty();

					var definedNumber = $('#' + widgetTca + '_form_searchable').val();
					if((definedNumber.length<1) || (definedNumber == "Обновить")){
						$('#' + widgetTca + '_info_error').
							text('Не выбран номер для проверки').
							fadeIn();
					}else{
						$.post('https://' + serverName + '/' + widgetPath + '/process.php?',
							{
								number: definedNumber,
								key: self.get_settings().widget_key,
								current: currentUser,
								amo_domain: window.location.hostname.split('.')[0],
								amo_user: system.amouser,
								amo_hash: system.amohash
							})
							.done(function( data ) {
								$('#' + widgetTca + '_preloader').css('display', 'none');
								if(data == false){
									$('#' + widgetTca + '_info_error').fadeOut().empty();
									$('#' + widgetTca + '_info_succeed').fadeOut().empty();
									$('#' + widgetTca + '_info_error').
										text('Не удалось обработать запрос').
										fadeIn();
								}else{
									$('#' + widgetTca + '_info_error').fadeOut().empty();
									$('#' + widgetTca + '_info_succeed').fadeOut().empty();
									if(data.operator !== null){
										$('.' + widgetTca + '_operator').css('display', '');
										$('#' + widgetTca + '_operator_title').text(data.operator);
										if(typeof data.operator_logo !== 'undefined'){
											$('#' + widgetTca + '_operator_icon_inner').css('display', '').css('background-image', 'url(\'' + data.operator_logo + '\')');
										}else{
											$('#' + widgetTca + '_operator_icon_inner').css('display', 'none');
										}
									}else{
										$('.' + widgetTca + '_operator').css('display', 'none');
									}
									if(data.region !== null){
										$('.' + widgetTca + '_region').css('display', '');
										$('#' + widgetTca + '_region_title').html('<a href="https://www.google.com/maps/@' + data.lat + ',' + data.lng + ',13z" target="_blank" style="color:#313942;text-decoration:none;">' + data.region + '</a>');
										if(typeof data.region_logo !== 'undefined'){
											$('#' + widgetTca + '_region_icon_inner').css('display', '').css('background-image', 'url(\'' + data.region_logo + '\')');
										}else{
											$('#' + widgetTca + '_region_icon_inner').css('display', 'none');
										}
									}else{
										$('.' + widgetTca + '_region').css('display', 'none');
									}
									if(data.x_country !== null){
										$('.' + widgetTca + '_country').css('display', '');
										$('#' + widgetTca + '_country_title').text(data.x_country);
										if(typeof data.x_iso !== 'undefined'){
											$('#' + widgetTca + '_country_icon_inner').css('display', '').css('background-image', 'url(\'https://' + serverName + '/assets/images/flags/' + data.x_iso.toLowerCase() + '.png\')');
										}else{
											$('#' + widgetTca + '_country_icon_inner').css('display', 'none');
										}
									}else{
										$('.' + widgetTca + '_region').css('display', 'none');
									}
									if(typeof data.current !== 'undefined'){
										$('.' + widgetTca + '_ctime').css('display', '');
										if(data.gmtOffset>0){
											var gmtOffset = '+' + data.gmtOffset;
										}else{
											var gmtOffset = data.gmtOffset;
										}
										var timezoneFull = '(GMT' + gmtOffset + '; ' + data.timezone + ')'
										$('#' + widgetTca + '_current_time').html('<span style="font-weight:bold;">' + data.current + '</span><br>' + timezoneFull);
										addTime(data.current,definedNumber,data.worktime,data.x_country,timezoneFull);
									}else{
										$('.' + widgetTca + '_ctime').css('display', 'none');
									}
								}
							})
							.fail(function() {
								$('#' + widgetTca + '_info_error').fadeOut().empty();
								$('#' + widgetTca + '_info_succeed').fadeOut().empty();
								$('#' + widgetTca + '_info_error').
									text('Не удалось обработать запрос').
									fadeIn();
							});
					}
				});
				$('#' + widgetTca + '_form_searchable').change(function() {
					if($('#' + widgetTca + '_form_searchable').val() == "Обновить"){
						$('#' + widgetTca + '_form_searchables_list').empty();
						if(AMOCRM.data.current_entity == "leads"){
							var queryUrl = 'https://' + window.location.hostname.split('.')[0] + '.amocrm.ru/api/v2/leads?id=' + AMOCRM.data.current_card.id;
						}else if(AMOCRM.data.current_entity == "contacts"){
							var queryUrl = 'https://' + window.location.hostname.split('.')[0] + '.amocrm.ru/api/v2/contacts?id=' + AMOCRM.data.current_card.id;
						}else if(AMOCRM.data.current_entity == "companies"){
							var queryUrl = 'https://' + window.location.hostname.split('.')[0] + '.amocrm.ru/api/v2/companies?id=' + AMOCRM.data.current_card.id;
						}
						var currentCardInfo = $.getJSON(
							queryUrl,
							function ( response ){
								if(AMOCRM.data.current_entity == "leads"){
									if(response._embedded.items[0].contacts.id !== undefined){
										for(var thsCntId=0; thsCntId<response._embedded.items[0].contacts.id.length; thsCntId++){
											var currentCardInfo = $.getJSON(
												'https://' + window.location.hostname.split('.')[0] + '.amocrm.ru/api/v2/contacts?id=' + response._embedded.items[0].contacts.id[thsCntId],
												function ( cntResponse ){
													for(var thsCstFld=0; thsCstFld<cntResponse._embedded.items[0].custom_fields.length; thsCstFld++){
														if(cntResponse._embedded.items[0].custom_fields[thsCstFld].name == "Телефон"){
															for(var thsPhnVal=0; thsPhnVal<cntResponse._embedded.items[0].custom_fields[thsCstFld].values.length; thsPhnVal++){
																var numberPre = cntResponse._embedded.items[0].custom_fields[thsCstFld].values[thsPhnVal].value.replace(/\D+/g,"");
																if(numberPre.substring(0,1) == "80"){
																	numberPre = '3' + numberPre;
																}else if(numberPre.substring(0,1) == "8"){
																	numberPre = '7' + numberPre.substring(1);
																}else if(numberPre.substring(0,1) == "0"){
																	numberPre = '38' + numberPre;
																}
																if(thsPhnVal == 0){
																	var classPref = ' control--select--list--item-selected';
																	$('#' + widgetTca + '_form_searchable').val('+' + numberPre);
																	$('#' + widgetTca + '_form_display_searchable').text('+' + numberPre).attr('data-value', '+' + numberPre);
																}else{
																	var classPref = '';
																}
																$('#' + widgetTca + '_form_searchables_list').append('\
										<li data-value="+' + numberPre + '" class="control--select--list--item' + classPref + '">\
											<span class="control--select--list--item-inner" title="+' + numberPre + '">+' + numberPre + '</span>\
										</li>');
															}
														}
													}
												});
										}
										var classPref = '';
									}else{
										var classPref = ' control--select--list--item-selected';
									}
								}else{
									for(var thsCstFld=0; thsCstFld<response._embedded.items[0].custom_fields.length; thsCstFld++){
										if(response._embedded.items[0].custom_fields[thsCstFld].name == "Телефон"){
											var phoneFound = true;
											for(var thsPhnVal=0; thsPhnVal<response._embedded.items[0].custom_fields[thsCstFld].values.length; thsPhnVal++){
												var numberPre = response._embedded.items[0].custom_fields[thsCstFld].values[thsPhnVal].value.replace(/\D+/g,"");
												if(numberPre.substring(0,1) == "80"){
													numberPre = '3' + numberPre;
												}else if(numberPre.substring(0,1) == "8"){
													numberPre = '7' + numberPre.substring(1);
												}else if(numberPre.substring(0,1) == "0"){
													numberPre = '38' + numberPre;
												}
												if(thsPhnVal == 0){
													var classPref = ' control--select--list--item-selected';
													$('#' + widgetTca + '_form_searchable').val('+' + numberPre);
													$('#' + widgetTca + '_form_display_searchable').
														text('+' + numberPre).
														attr('data-value', '+' + numberPre);
												}else{
													var classPref = '';
												}
												$('#' + widgetTca + '_form_searchables_list').append('\
										<li data-value="+' + numberPre + '" class="control--select--list--item' + classPref + '">\
											<span class="control--select--list--item-inner" title="+' + numberPre + '">+' + numberPre + '</span>\
										</li>');
											}
										}
									}
									if(phoneFound === undefined){
										$('#' + widgetTca + '_form_display_searchable').text('Номера не найдены');
										var classPref = ' control--select--list--item-selected';
									}else{
										var classPref = '';
									}
								}
								if(classPref != ""){
									$('#' + widgetTca + '_form_display_searchable').text('Номера не найдены');
								}
								$('#' + widgetTca + '_form_searchables_list').append('\
										<li data-value="Обновить" class="control--select--list--item' + classPref + ' ' + widgetTca + '_action_update_searchables">\
											<span class="control--select--list--item-inner" title="Обновить">Обновить</span>\
										</li>');
							})
							.fail(function() {
								$('#' + widgetTca + '_form_display_searchable').text('Номера не определены');
								$('#' + widgetTca + '_form_searchables_list').append('\
										<li data-value="Обновить" class="control--select--list--item control--select--list--item-selected ' + widgetTca + '_action_update_searchables">\
											<span class="control--select--list--item-inner" title="Обновить">Обновить</span>\
										</li>');
							});
					}else{
						$('#' + widgetTca + '_form_display_searchable').text($('#' + widgetTca + '_form_searchable').val());
					}
				});
			$(document).ready(function(){
				if((AMOCRM.data.current_entity == "leads") || (AMOCRM.data.current_entity == "contacts") || (AMOCRM.data.current_entity == "companies"))
				{
					var inputsNum = $('[data-pei-code="phone"] input[type="text"]');
					var fomatedNum = new Array();
					for (var i=0; i < inputsNum.length; i++)
					{
						var tempel = {
						number: '+'+inputsNum[i].value.replace(/[\ \-]/g,""),
						wt: self.get_settings().worktime
						};
						fomatedNum.push(tempel);
					}
					$.post('https://' + serverName + '/' + widgetPath + '/process.php?',
							{
								number: fomatedNum,
								worktime: self.get_settings().worktime,
								key: self.get_settings().widget_key,
								current: currentUser,
								amo_domain: window.location.hostname.split('.')[0],
								amo_user: system.amouser,
								amo_hash: system.amohash
							})
							.done(function( data ) {
								for (var i=0; i < data.length; i++)
								{
									if (data[i]!==false)
									{
									if(typeof data[i].current !== 'undefined')
									{
										if(data[i].gmtOffset>0){
											var gmtOffset = '+' + data[i].gmtOffset;
										}else{
											var gmtOffset = data[i].gmtOffset;
										}
										var timezoneFull = '(GMT' + gmtOffset + '; ' + data[i].timezone + ')'
										addTime(data[i].current,data[i].phone,data[i].worktime,data[i].x_country,timezoneFull);
									}
									}
								}
							})

						/*$.post('https://' + serverName + '/' + widgetPath + '/index.php?act=check',
							{
							})
							.done(function( data ) {

							})*/

				}
			 });
				return true;
			},
			render: function () {
				console.log("render");
				var lang = self.i18n('userLang');
				w_code = self.get_settings().widget_code;
				if(w_code.substr(0, 4) == "amo_"){
					var widgetStylePath = '/widgets/' + w_code + '/style.css';
				}else{
					var widgetStylePath = '/upl/' + w_code + '/widget/style.css';
				}
				if (typeof(AMOCRM.data.current_card) != 'undefined') {
					if (AMOCRM.data.current_card.id == 0) {
						return false;
					}
				}
				/*
					Генерация списка получателей на основании контакта
				*/
				if(AMOCRM.data.current_entity == "leads"){
					var queryUrl = 'https://' + window.location.hostname.split('.')[0] + '.amocrm.ru/api/v2/leads?id=' + AMOCRM.data.current_card.id;
					console.log("leads queryUrl");
					console.log(queryUrl);
				}else if(AMOCRM.data.current_entity == "contacts"){
					var queryUrl = 'https://' + window.location.hostname.split('.')[0] + '.amocrm.ru/api/v2/contacts?id=' + AMOCRM.data.current_card.id;
					console.log("contacts queryUrl");
					console.log(queryUrl);
				}else if(AMOCRM.data.current_entity == "companies"){
					var queryUrl = 'https://' + window.location.hostname.split('.')[0] + '.amocrm.ru/api/v2/companies?id=' + AMOCRM.data.current_card.id;
				}
				var currentCardInfo = $.getJSON(
					queryUrl,
					function ( response ){
						if(AMOCRM.data.current_entity == "leads"){
							/*
								Обработка сделок
							*/
							if(response._embedded.items[0].contacts.id !== undefined){
								console.log(response._embedded.items[0].contacts.id);
								for(var thsCntId=0; thsCntId<response._embedded.items[0].contacts.id.length; thsCntId++){
									var currentCardInfo = $.getJSON(
										'https://' + window.location.hostname.split('.')[0] + '.amocrm.ru/api/v2/contacts?id=' + response._embedded.items[0].contacts.id[thsCntId],
										function ( cntResponse ){
											for(var thsCstFld=0; thsCstFld<cntResponse._embedded.items[0].custom_fields.length; thsCstFld++){
												if(cntResponse._embedded.items[0].custom_fields[thsCstFld].name == "Телефон"){
													for(var thsPhnVal=0; thsPhnVal<cntResponse._embedded.items[0].custom_fields[thsCstFld].values.length; thsPhnVal++){
														var numberPre = cntResponse._embedded.items[0].custom_fields[thsCstFld].values[thsPhnVal].value.replace(/\D+/g,"");
														if(numberPre.substring(0,1) == "80"){
															numberPre = '3' + numberPre;
														}else if(numberPre.substring(0,1) == "8"){
															numberPre = '7' + numberPre.substring(1);
														}else if(numberPre.substring(0,1) == "0"){
															numberPre = '38' + numberPre;
														}
														if(thsPhnVal == 0){
															var classPref = ' control--select--list--item-selected';
															$('#' + widgetTca + '_form_searchable').val('+' + cntResponse._embedded.items[0].custom_fields[thsCstFld].values[thsPhnVal].value.replace(/\D+/g,""));
															$('#' + widgetTca + '_form_display_searchable').text('+' + numberPre).attr('data-value', '+' + numberPre);
														}else{
															var classPref = '';
														}
														$('#' + widgetTca + '_form_searchables_list').append('\
										<li data-value="+' + numberPre + '" class="control--select--list--item' + classPref + '">\
											<span class="control--select--list--item-inner" title="+' + numberPre + '">+' + numberPre + '</span>\
										</li>');
													}
												}
											}

										});
								}
								var classPref = '';
							}else{
								var classPref = ' control--select--list--item-selected';
							}
						}else{
							for(var thsCstFld=0; thsCstFld<response._embedded.items[0].custom_fields.length; thsCstFld++){
								if(response._embedded.items[0].custom_fields[thsCstFld].name == "Телефон"){
									var phoneFound = true;
									console.log(phoneFound);
									for(var thsPhnVal=0; thsPhnVal<response._embedded.items[0].custom_fields[thsCstFld].values.length; thsPhnVal++){
										var numberPre = response._embedded.items[0].custom_fields[thsCstFld].values[thsPhnVal].value.replace(/\D+/g,"");
										if(numberPre.substring(0,1) == "80"){
											numberPre = '3' + numberPre;
										}else if(numberPre.substring(0,1) == "8"){
											numberPre = '7' + numberPre.substring(1);
										}else if(numberPre.substring(0,1) == "0"){
											numberPre = '38' + numberPre;
										}
										if(thsPhnVal == 0){
											var classPref = ' control--select--list--item-selected';
											$('#' + widgetTca + '_form_searchable').val('+' + numberPre);
											$('#' + widgetTca + '_form_display_searchable').
												text('+' + numberPre).
												attr('data-value', '+' + numberPre);
										}else{
											var classPref = '';
										}
										$('#' + widgetTca + '_form_searchables_list').append('\
										<li data-value="+' + numberPre + '" class="control--select--list--item' + classPref + '">\
											<span class="control--select--list--item-inner" title="+' + numberPre + '">+' + numberPre + '</span>\
										</li>');
									}
								}
							}
							if(phoneFound === undefined){
								$('#' + widgetTca + '_form_display_searchable').text('Номера не найдены');
								var classPref = ' control--select--list--item-selected';
							}else{
								var classPref = '';
							}

						}
						if(classPref != ""){
							$('#' + widgetTca + '_form_display_searchable').text('Номера не найдены');
						}
						$('#' + widgetTca + '_form_searchables_list').append('\
										<li data-value="Обновить" class="control--select--list--item' + classPref + ' ' + widgetTca + '_action_update_searchables">\
											<span class="control--select--list--item-inner" title="Обновить">Обновить</span>\
										</li>');
					})
					.fail(function() {
						$('#' + widgetTca + '_form_display_searchable').text('Номера не определены');
						$('#' + widgetTca + '_form_searchables_list').append('\
										<li data-value="Обновить" class="control--select--list--item control--select--list--item-selected ' + widgetTca + '_action_update_searchables">\
											<span class="control--select--list--item-inner" title="Обновить">Обновить</span>\
										</li>');
					});
				self.render_template({
					caption: {
						class_name: widgetTca + '_js-ac-caption',
						html: ''
					},
					body: '',
					render: '\
						<div class="' + widgetTca + '_ac-form">\
							<div class="' + widgetPath + '-button ' + widgetTca + '_ac_sub">Настройки определения</div>\
							<div style="width: 80%;margin-top: 15px;">\
								<div class="control--select" style="margin-top:10px;">\
									<ul id="' + widgetTca + '_form_searchables_list" class="custom-scroll control--select--list"></ul>\
									<button id="' + widgetTca + '_form_display_searchable" class="control--select--button" type="button" data-value=""></button>\
									<input id="' + widgetTca + '_form_searchable" type="hidden" class="control--select--input" name="" value="" data-prev-value="">\
								</div>\
								<div id="' + widgetTca + '_preloader" style="width:100%;display:none;margin-top:10px;">\
									<div style="width:64px;height:64px;background-image:url(\'https://' + serverName + '/assets/images/js-preloader.gif\');background-repeat:no-repeat;background-position:center center;cursor:wait;margin-left:auto;margin-right:auto;"></div>\
								</div>\
								<div style="margin-top:10px;" align="center">\
									<div id="' + widgetTca + '_info_error" style="padding-bottom: 5px;background-color: #ffdbdb;padding-top: 5px;border: 1px solid #ffa6a6;border-radius: 5px;margin-bottom: 10px;color: #a04848;display: none;">Prohibido</div>\
									<div id="' + widgetTca + '_info_succeed" style="padding-bottom: 5px;background-color: #cfffe7;padding-top: 5px;border: 1px solid #8bd0ad;border-radius: 5px;margin-bottom: 10px;color: #46775e;display: none;">Exitosamente</div>\
									<table style="width:100%;margin-bottom:7px;border:0;">\
										<tr class="' + widgetTca + '_operator" style="display:none;border:0;">\
											<td style="border:0;font-size:9pt;">Оператор:</td>\
										</tr>\
										<tr class="' + widgetTca + '_operator" style="display:none;border:0;border-bottom:1px dotted #efefef;">\
											<td style="text-align:right;border:0;">\
												<table style="width:inherit;float:right;border:0;">\
													<tr>\
														<td id="' + widgetTca + '_operator_icon_outer" style="border:0">\
															<div id="' + widgetTca + '_operator_icon_inner" style="margin-bottom:-3px;width:18px;height:18px;background-repeat:no-repeat;background-position:center center;background-size:cover;"></div>\
														</td>\
														<td id="' + widgetTca + '_operator_title" style="border:0;padding-left:3px;font-weight:bold;">\
															%OPERATOR_TITLE%\
														</td>\
													</tr>\
												</table>\
											</td>\
										</tr>\
										<tr class="' + widgetTca + '_region" style="display:none;border:0">\
											<td style="border:0;font-size:9pt;">Регион:</td>\
										</tr>\
										<tr class="' + widgetTca + '_region" style="display:none;border:0;border-bottom:1px dotted #efefef;">\
											<td style="text-align:right;border:0;">\
												<table style="width:inherit;float:right;border:0;">\
													<tr>\
														<td id="' + widgetTca + '_region_icon_outer" style="border:0">\
															<div id="' + widgetTca + '_region_icon_inner" style="margin-bottom:-3px;width:18px;height:18px;background-repeat:no-repeat;background-position:center center;background-size:contain;"></div>\
														</td>\
														<td id="' + widgetTca + '_region_title" style="border:0;padding-left:3px;font-weight:bold;">\
															%OPERATOR_REGION%\
														</td>\
													</tr>\
												</table>\
											</td>\
										</tr>\
										<tr class="' + widgetTca + '_country" style="display:none;border:0">\
											<td style="border:0;font-size:9pt;">Страна:</td>\
										</tr>\
										<tr class="' + widgetTca + '_country" style="display:none;border:0;border-bottom:1px dotted #efefef;">\
											<td style="text-align:right;border:0;">\
												<table style="width:inherit;float:right;border:0;">\
													<tr>\
														<td id="' + widgetTca + '_country_icon_outer" style="border:0">\
															<div id="' + widgetTca + '_country_icon_inner" style="margin-bottom:-3px;width:18px;height:18px;background-repeat:no-repeat;background-position:center center;background-size:contain;"></div>\
														</td>\
														<td id="' + widgetTca + '_country_title" style="border:0;padding-left:3px;font-weight:bold;">\
															%OPERATOR_COUNTRY%\
														</td>\
													</tr>\
												</table>\
											</td>\
										</tr>\
										<tr class="' + widgetTca + '_ctime" style="display:none;border:0">\
											<td style="border:0;font-size:9pt;">Текущее время:</td>\
										</tr>\
										<tr class="' + widgetTca + '_ctime" style="display:none;border:0">\
											<td style="text-align:right;border:0" id="' + widgetTca + '_current_time">%CURRENT_TIME%</td>\
										</tr>\
									</table>\
									<button type="button" class="button-input" id="' + widgetTca + '_action_check" style="width: 100%;background-color: #23c48e;color: #fff;border: 1px solid #4bb18c;">\
										<span class="button-input-inner">\
											<span class="button-input-inner__text">Быстрая проверка</span>\
										</span>\
									</button>\
								</div>\
							</div>\
						</div>\
						<link type="text/css" rel="stylesheet" href="' + self.get_settings().path + '/style.css?v='+self.get_settings().version+'">'
				});
				return true;
			},
			destroy: function () {
				console.log('destroy');
				return true;
			},
			contacts: {
				selected: function () {
				}
			},
			leads: {
				selected: function () {
				}
			}
		};
		return this;
	};
