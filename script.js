//define(['jquery', 'lib/components/base/modal'], function($, Modal){
	var CustomWidget = function () {
		var self = this, system = self.system(), widgetTca = 'bizandsoft_tzdata', widgetPath = 'tzdata', currentUser = $('.n-avatar').first().attr('id'), serverName = 'amo.bizandsoft.ru', idField, idFieldCM, defaultWT;
		
		//установка маски интервала времени
		function addTimeMask(input) 
		{
			for(var i = 0; i < input.length; i++)
			{
			var el = input[i];
			$(el).attr("placeholder", "**:**-**:**");
			$(el).attr("title", "Интервал рабочего времени: **:**-**:**");
			$(el).on('keydown', function(e) 
			{
			if(e.keyCode < 8 || (e.keyCode > 8 && e.keyCode < 46) || (e.keyCode > 57 )) {e.preventDefault();}
		 
			var length = $(this).val().length;
		 
			if(length == 2 || length == 8) 
			{
				if (e.keyCode != 8 && e.keyCode != 46) 
					this.value = this.value+':';
			}
			
			if(length == 5) {
				if (e.keyCode != 8 && e.keyCode != 46)  
					this.value = this.value+'-';
			}
			
			if(length > 10)
			{
				if (e.keyCode != 8 && e.keyCode != 46)
				e.preventDefault();
			}
			});
			}
		};
		
		//установка маски телефона времени
		function addPhoneMask(input) 
		{
			$(input).on('keydown', function(e) 
			{
				
			if(e.keyCode < 8 || (e.keyCode > 8 && e.keyCode < 46) || (e.keyCode > 57 )) {
			  e.preventDefault();
			}
		 
			var length = this.value.length;
			if(length <= 15)
				switch(length) {
				  case 0:  
					if (e.keyCode != 8 && e.keyCode != 46) 
						this.value = this.value+'+7(';
					break;
				  case 2: 
					if (e.keyCode != 8 && e.keyCode != 46) 
						this.value = this.value+'(';
					break;
				  case 6: 
					if (e.keyCode != 8 && e.keyCode != 46) 
						this.value = this.value+')';
					break;
				 case 10:
				 case 13: 
				 if (e.keyCode != 8 && e.keyCode != 46) 
						this.value = this.value+'-';
					break;
				}
				else
					if (e.keyCode != 8 && e.keyCode != 46)
					e.preventDefault();
			});
		};
		
		//проверка вхождения времени в интервал
		function checkWT(time, setupTime)
		{
			var nowTime = new Date();
			var currentTime = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate(), time.slice(0,2), time.slice(3,5),0, 0);
			var lowTime = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate(), setupTime.slice(0,2), setupTime.slice(3,5),0, 0);
			var upTime = new Date(nowTime.getFullYear(), nowTime.getMonth(), nowTime.getDate(), setupTime.slice(6,8), setupTime.slice(9,11),0, 0);
			var res = false;
			if ((lowTime <= currentTime && currentTime <= upTime))
				res = true;
			return res;		
		}
		
		//обновление времени
		function updateTime(parentEl)
		{
			var tzone = $(parentEl).text().match(/GMT(.*?);/);
			var nowTime = new Date();
			var outTime;
			var offsetTime = new Date().getTimezoneOffset();
			var setupTime = '09:00-18:00';
			
			nowTime.setMinutes(nowTime.getMinutes() + offsetTime);
			offsetTime = +tzone[1] * 3600;
			nowTime.setSeconds(nowTime.getSeconds() + offsetTime);
			var nowMin = nowTime.getMinutes();
			if (nowMin < 10)
				nowMin = '0'+nowMin;
			outTime = nowTime.getHours() + ':' + nowMin;
			$(parentEl).find($("span")).text(outTime);
			
			if (defaultWT!==null)
				setupTime = defaultWT;
			if (idField!==null)
			{
				var parentF = $(parentEl).closest("form");
				if (parentF.find('input[name="CFV['+idField+']"]').val() !==undefined)
				{
					var wtVal = parentF.find('input[name="CFV['+idField+']"]').val();
					if (wtVal !== '')
						setupTime = wtVal;
				}
			}
			if (idFieldCM!==null)
			{
				var parentF = $(parentEl).closest("form");
				if (parentF.find('input[name="CFV['+idFieldCM+']"]').val() !==undefined)
				{
					var wtVal = parentF.find('input[name="CFV['+idFieldCM+']"]').val();
					if (wtVal !== '')
						setupTime = wtVal;
				}
			}
			
			$(parentEl).removeClass('bizandsoft-state-false');
			if (!checkWT(outTime,setupTime))
				$(parentEl).addClass('bizandsoft-state-false');				
		}
		
		//добавление верстки с временем 
		function  addTime(time,number,country,tzone,region) 
		{
			var phoneNum = number.slice(1);
			var phoneFlds = $('input.control-phone__formatted');
			var fieldOfNumber = new Array();
/*var fieldOfNumber = new Array();
			
			
			for (var i=0; i < inputsNum.length; i++)
			{
				if (inputsNum[i].value!='')
				{
				var tempel = {
					number: checkNumber(inputsNum[i]),
					wt: self.get_settings().worktime
				};
					if (tempel.number.length<13)
					fomatedNum.push(tempel);
			
			
			var fomatedNum = new Array();
			for (var i=0; i < inputsNum.length; i++)
			{
				if (inputsNum[i].value!='')
				{
				var tempel = {
					number: checkNumber(inputsNum[i]),
					wt: self.get_settings().worktime
				};
					if (tempel.number.length<13)
					fomatedNum.push(tempel);
			var setupTime = '09:00-18:00';
			var shortTime = time.slice(-8,-3);
			
			for(var i=0; i<phoneFlds.length; i++)
			{
				if (phoneFlds[i].value == phoneNum || phoneFlds[i].value.replace(/[\ \-]/g,"") == phoneNum || phoneFlds[i].value.replace(/[\ \-]/g,"") == ("+" + phoneNum) || phoneFlds[i].value.replace(/[\ \-]/g,"") == ('8'+ phoneNum.substr(1)))
				{fieldOfNumber.push($(phoneFlds[i]));}
			}
	
			if (defaultWT!==null)
				setupTime = defaultWT;
			if (idField!==null)
			{
				for(var i=0; i<fieldOfNumber.length; i++)*/
			var setupTime = '09:00-18:00';
			var shortTime = time.slice(-8,-3);
			
			for(var i=0; i<phoneFlds.length; i++)
			{
				if (phoneFlds[i].value == phoneNum || phoneFlds[i].value.replace(/[\ \-]/g,"") == phoneNum || phoneFlds[i].value.replace(/[\ \-]/g,"") == ("+" + phoneNum) || phoneFlds[i].value.replace(/[\ \-]/g,"") == ('8'+ phoneNum.substr(1)))
				{fieldOfNumber.push(phoneFlds[i]);}
			}
	
			if (defaultWT!==null)
				setupTime = defaultWT;
			if (idField!==null)
			{
				for(var i=0; i<fieldOfNumber.length; i++)
				{
				var parentF = $(fieldOfNumber[i]).closest("form");
				if (parentF.find('input[name="CFV['+idField+']"]').val() !==undefined)
				{
					var wtVal = parentF.find('input[name="CFV['+idField+']"]').val();
					if (wtVal !== '')
						setupTime = wtVal;
				}
				}
			}
			if (idFieldCM!==null)
			{
				for(var i=0; i<fieldOfNumber.length; i++)
				{
				var parentF = $(fieldOfNumber[i]).closest("form");
				if (parentF.find('input[name="CFV['+idFieldCM+']"]').val() !==undefined)
				{
					var wtVal = parentF.find('input[name="CFV['+idFieldCM+']"]').val();
					if (wtVal !== '')
						setupTime = wtVal;
				}
				}
			}

			var divTime = '<span class="bizandsoft_add-info';
			if (!checkWT(shortTime,setupTime))
				divTime = divTime + ' bizandsoft-state-false';
					
			var addDescr = '<table class="' + widgetTca + '_add_descr" style="margin-bottom:7px;">';
							if(region !== null)
							{
							addDescr = addDescr +'<tr class="' + widgetTca + '_country" style="border:0">\
							<td class="' + widgetTca + '_min_header">Регион:</td>\
							</tr>\
							<tr class="' + widgetTca + '_country" style="border-bottom:1px dotted #efefef;">\
								<td style="text-align:right;">\
									<table style="width:inherit;float:right;">\
										<tr>\
											<td  style="padding-left:3px;">\
											'+ region +'</td>\
										</tr>\
									</table>\
								</td>\
							</tr>';	
							}
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
			
			$(fieldOfNumber).parent().find(".bizandsoft_add-info").remove();
			$(fieldOfNumber).parent().append(divTime);
        }
		
		function checkNumber(number) {
			var res;
			res = number.value.replace(/[\ \-]/g,"");
			if (number.value[0]=='8' && number.value[1]!=='0')
				res = '+7' + number.value.substr(1).replace(/[\ \-]/g,"");
			
			if (number.value.substring(0,2) == "80")
				res = '+3' + number.value.replace(/[\ \-]/g,"");
			
			if (number.value[0] == "0")
				res = '+38' + number.value.replace(/[\ \-]/g,"");
			
			if (number.value[0]!='+' && number.value[0]!=='8' && number.value[0]!='0')
				res = '+' + number.value.replace(/[\ \-]/g,"");
			return res;	
		}
		
		//отправка телефонов на получение времени
		function firstSetTime() 
		{
			var inputsNum = $('[data-pei-code="phone"] input[type="text"]');	
			var fomatedNum = new Array();
			for (var i=0; i < inputsNum.length; i++)
			{
				if (inputsNum[i].value!='')
				{
				var tempel = {
					number: checkNumber(inputsNum[i]),
					wt: self.get_settings().worktime
				};
					if (tempel.number.length<13)
					fomatedNum.push(tempel);
				}
			}
			
			self.crm_post(
				'https://' + serverName + '/' + widgetPath + '/process.php?',
				{
					number: fomatedNum, 
					worktime: self.get_settings().worktime,
					key: self.get_settings().widget_key,
					current: currentUser,
					amo_domain: window.location.hostname.split('.')[0],
					amo_user: system.amouser,
					amo_hash: system.amohash
				},
				function (msg) 
				{
				var data = $.parseJSON(msg);
				for (var i=0; i < data.length; i++)
					{
						if (data[i]!==false)
						{
							if(typeof data[i].current !== 'undefined')
							{
								var gmtOffset;
								if(data[i].gmtOffset>0)
									gmtOffset = '+' + data[i].gmtOffset;
									else
									gmtOffset = data[i].gmtOffset;
								var timezoneFull = '(GMT' + gmtOffset + '; ' + data[i].timezone + ')';
								addTime(data[i].current,data[i].phone,data[i].x_country,timezoneFull,data[i].region);
							}
						}
					}
				},
				'text'
			);
		}
		
		this.callbacks = {
			settings: function(){
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
				if($('.widget-settings__base-space').length > 0){
					if($('body').find('.widget-state.widget-state_statusstatus_installed').length == 0){
						if(typeof($('#' + widgetTca + '_accept').get(0).checked) == "boolean" && $('#' + widgetTca + '_accept').get(0).checked == false){
							$('#' + widgetTca + '_agreement_error')
								.css('display', 'block')
								.css('margin-bottom', '25px')
								.css('margin-top', '20px')
								.css('background-color', '#ffbbbb')
								.css('padding', '7px')
								.css('border-radius', '5px')
								.css('border', '1px solid #ff5454')
								.css('color', '#a70d0d')
								.text('Прежде, чем виджет будет успешно установлен, Вам необходимо дать согласие на передачу авторизационной информации на сервера компании «Бизнес и софт».');
							$('#' + self.get_settings().widget_code + ' > .button-input-inner').css('display', '');
							$('#' + self.get_settings().widget_code + ' > .button-input__spinner').css('display', 'none');
							$('#' + self.get_settings().widget_code).removeClass('button-input-loading');
							$('#' + self.get_settings().widget_code).removeAttr('data-loading');
							$('#' + widgetTca + '_accept_tense')
								.css('color', '#a70d0d');
							return false;
						}else{
							$('#' + widgetTca + '_agreement_error').css('display', 'none');
							$('#' + widgetTca + '_accept_tense')
								.css('color', 'inherit');
							return true;
						}
					}else{
						return true;
					}
				}else{
					if($('#widget_active__sw').length > 0){
						return true;
					}else{
						if(typeof($('#' + widgetTca + '_accept').get(0).checked) == "boolean" && $('#' + widgetTca + '_accept').get(0).checked == false){
							if($('#' + widgetTca + '_agreement_error_old').length == 0){
								$('.widget_settings_block__fields').append('<div class="widget_settings_block__item_field"><div id="' + widgetTca + '_agreement_error_old"></div></div>');
							}
							$('#' + widgetTca + '_agreement_error_old')
								.css('display', 'block')
								.css('background-color', '#ffbbbb')
								.css('padding', '7px')
								.css('border-radius', '5px')
								.css('border', '1px solid #ff5454')
								.css('color', '#a70d0d')
								.text('Прежде, чем виджет будет успешно установлен, Вам необходимо дать согласие на передачу авторизационной информации на сервера компании «Бизнес и софт».');
							$('#save_' + self.get_settings().widget_code + ' > .button-input-inner').css('display', '');
							$('#save_' + self.get_settings().widget_code + ' > .button-input__spinner').css('display', 'none');
							$('#save_' + self.get_settings().widget_code).removeClass('button-input-loading');
							$('#save_' + self.get_settings().widget_code).removeAttr('data-loading');
							$('#' + widgetTca + '_accept_tense')
								.css('color', '#a70d0d');
							return false;
						}else{
							$('#' + widgetTca + '_agreement_error_old').css('display', 'none');
							$('#' + widgetTca + '_accept_tense')
								.css('color', 'inherit');
							return true;
						}
					}
				}
			},
			init: function () {
				return true;
			},
			bind_actions: function () {
				//добавление пункта меню оплаты лицензии
				if (AMOCRM.constant('user_rights').is_admin) 
				{
					//#biz-offer-item - id элемента пункта меню
					$('#biz-offer-item').on('click', function () {
						
						//верстка модального окна
						var modalWindowInner =
						   '<div>\
								<span class="modal-body__close">\
									<span class="icon icon-modal-close">\
									</span>\
								</span>\
								<h2 style="text-align:center; font-weight:bold;" class="modal-body__caption head_2">Официальный партнёр и интегратор<br> «БИЗНЕС И СОФТ»</h2>\
								<ol style="list-style-type: decimal;">\
									<li style="padding-bottom: 5px;">БИЗНЕС И СОФТ как партнёр даёт Вам дополнительный месяц в подарок.</li>\
									<li style="padding-bottom: 5px;">Наша компании занимается разработкой и при продлении лицензии дарит виджеты в подарок. Ознакомиться с нашими полезными виджетами можно в <a href="https://drive.google.com/open?id=1U666VH7tEfAPX0EZ1Ob_wX66q9owzm9K" target="_blank">презентации</a>.</li>\
									<li style="padding-bottom: 5px;">Мы предлагаем Вам рассрочку по оплате - 50% предоплата и 50% через 2 месяца.</li>\
								</ol>\
								<br>\
								<div class="modal-body__actions">\
									 <button type="button" class="button-input  button-input_blue" style="margin: auto;" id="biz-offer-accept">\
										<span class="button-input-inner ">\
											<span class="button-input-inner__text">Купить через партнёра «БИЗНЕС И СОФТ»</span>\
										</span>\
									 </button>\
								</div>\
							</div>';
							//создание стандартного модального окна amo
							modalOffer = new Modal({
								class_name: 'modal-window',
								init: function ($modal_body) {
									$modal_body.trigger('modal:loaded').html(modalWindowInner).trigger('modal:centrify').append('');
								},
								destroy: function () {}
							});
							
							//обработчик клика по кнопке "Купить через партнёра «БИЗНЕС И СОФТ»"
							$('#biz-offer-accept').on('click', function (e) {
								if (typeof modalOffer !== 'undefined')
								modalOffer.destroy();
								
								//по клику выводим новое окно с ФОС
								var modalOfferAccept =
								'<div class="modal-body__inner">\
									<span class="modal-body__close">\
										<span class="icon icon-modal-close">\
										</span>\
									</span>\
									<h2 style="text-align:center; font-weight:bold;" class="modal-body__caption head_2">Официальный партнёр и интегратор<br> «БИЗНЕС И СОФТ»</h2>\
									<div class="user-profile__table_fields">\
										<div class="user-profile__table_fields-name">Имя</div>\
										<div class="user-profile__table_inputs">\
											<input name="user_name" class="text-input" type="text" value="' + AMOCRM.constant('user').name + '" autocomplete="off">\
										</div>\
									</div>\
									<div class="user-profile__table_fields">\
										<div class="user-profile__table_fields-name">Телефон</div>\
										<div class="user-profile__table_inputs">\
											<input name="user_phone" class="text-input" type="text" value="' + ((AMOCRM.constant('user').personal_mobile!=null) ? AMOCRM.constant('user').personal_mobile : '') + '" autocomplete="off">\
										</div>\
									</div>\
									<div class="user-profile__table_fields">\
										<div class="user-profile__table_fields-name">Email</div>\
										<div class="user-profile__table_inputs">\
											<input name="user_email" class="text-input" type="text" value="' + AMOCRM.constant('user').login + '" autocomplete="off">\
										</div>\
									</div>\
									<div class="user-profile__table_fields user-profile__table_fields-note-row">\
										<div class="user-profile__table_fields-name user-profile__table_fields-note">Комментарий</div>\
										<div class="user-profile__table_inputs">\
											<textarea name="user_comment" class="text-input text-input-textarea "></textarea>\
										</div>\
									</div>\
									<div class="modal-body__actions ">\
										<button type="button" class="button-input  button-input_blue" style="margin: auto;" id="biz-offer-accept-send">\
										<span class="button-input-inner ">\
											<span class="button-input-inner__text">Отправить заявку</span>\
										</span>\
										</button>\
									</div>\
								</div>';
								
								modalOfferAcceptSend = new Modal({
									class_name: 'modal-window',
									init: function ($modal_body) {
										$modal_body.trigger('modal:loaded').html(modalOfferAccept).trigger('modal:centrify');
										addPhoneMask('.modal-window input[name="user_phone"]');
									},
									destroy: function () {}
								});
								
								//обработчик клика по кнопке "Отправить заявку"
								$('#biz-offer-accept-send').on('click', function (e) {
									//отправляет если заполнен телефон или email
									if ($('input[name="user_phone"]').val() != '' || $('input[name="user_email"]').val()!='') 
									{
										$(this).trigger('button:load:start');
										var templ = require('twig');
										
										//отправка данных на сервер
										self.crm_post(
											'https://' + serverName + '/' + widgetPath + '/index.php?'+
											'dom=' + window.location.hostname.split('.')[0] + '&'+
											'key=' + self.get_settings().widget_key + '&'+
											'current=' + currentUser + '&act=payLicense',
											{
												user_name: $('input[name="user_name"]').val(),
												user_phone: $('input[name="user_phone"]').val(),
												user_email: $('input[name="user_email"]').val(),
												paylicense_text: $('textarea[name="user_comment"]').val(),
											},
											function (response) {
												if (typeof modalOfferAcceptSend !== 'undefined')
												modalOfferAcceptSend.destroy();
												
												new Modal({
													class_name: 'modal-window',
													init: function ($modal_body) {
													$modal_body.trigger('modal:loaded').html(templ({ref: '/tmpl/common/modal/success.twig'}).render({msg: 'Спасибо! Заявка успешно отправлена'})).trigger('modal:centrify');
													},
													destroy: function () {}
												});
											 },
											 'text',
											 function (msg) {
												 if (typeof modalOfferAcceptSend !== 'undefined')
												 modalOfferAcceptSend.destroy();
												 new Modal({
													 class_name: 'modal-window',
													 init: function ($modal_body) {
													 $modal_body.trigger('modal:loaded').html(templ({ref: '/tmpl/common/modal/error.twig'}).render({msg: 'Не удалось отправить заявку'})).trigger('modal:centrify');
													 },
													 destroy: function () {}
												 });
											 }
										 );
									}
									else 
									{
										$('input[name="user_email"]').attr('style','background: #ffdada;');
										$('input[name="user_phone"]').attr('style','background: #ffdada;');
										$('input[name="user_email"]', 'input[name="user_phone"]').on('input', function() {
											$('input[name="user_email"]').attr('style','background: #fcfcfc;');
											$('input[name="user_phone"]').attr('style','background: #fcfcfc;');
										});
										/*$('input[name="user_phone"]').on('input', function() {
										$('input[name="user_email"]').attr('style','background: #fcfcfc;');
										$('input[name="user_phone"]').attr('style','background: #fcfcfc;');
										});*/
									}
								});
							});
					});
				}
				
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
										addTime(data.current,definedNumber,data.x_country,timezoneFull,data.region);
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
																if (cntResponse._embedded.items[0].custom_fields[thsCstFld].values[thsPhnVal].value!='')
																{
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
																if (numberPre!='')
																$('#' + widgetTca + '_form_searchables_list').append('\
										<li data-value="+' + numberPre + '" class="control--select--list--item' + classPref + '">\
											<span class="control--select--list--item-inner" title="+' + numberPre + '">+' + numberPre + '</span>\
										</li>');
															}
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
												if(numberPre.substring(0,2) == "80"){
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
					self.crm_post(
						'https://' + serverName + '/' + widgetPath + '/index.php?dom='+window.location.hostname.split('.')[0]+'&act=check',
						{dom: window.location.hostname.split('.')[0]},
						function (msg) 
						{
							var res = $.parseJSON(msg);
							defaultWT = res['global_wt'];
							idField = res['field_wt'];
							idFieldCM = res['field_wtcm'];
							addTimeMask($('input[name="CFV['+idField+']"]'));
							addTimeMask($('input[name="CFV['+idFieldCM+']"]'));
							firstSetTime();
							setInterval(function() {
								for(var i = 0; i < $(".bizandsoft_add-info").length; i++)
								{updateTime($(".bizandsoft_add-info")[i]);}
							}, 60000);
						},
						'text'
					);
				}	
			 });
				return true;
			},
			
			render: function () {
				var wgPageCode = "<div class='fos-"+widgetTca+"'>\
						<p class='widget_header__description_h'>Продлить через партнера</p><br>\
						<p>Для ... заполните форму обратной связи и ...</p><br>\
						<form id='fos-"+widgetTca+"' action='' method='post'>\
							<input class='widget_settings_block__controls__ text-input' type='text' name='' placeholder='Поле1' required><br><br>\
							<input class='widget_settings_block__controls__ text-input' type=tel' name=''  placeholder='Поле2' required><br><br>\
							<textarea rows='4' cols='45' name='' placeholder='Текст сообщения'></textarea><br><br>\
							<input type='checkbox' id='consent-fos-"+widgetTca+"' name='' required=''>\
							<label for='consent-fos-"+widgetTca+"'>Я согласен(а) на обработку персональных данных. *</label><br><br>\
							<button class='button-input btn"+widgetTca+"'>Отправить</button><br>\
						</form>\
					</div>";
				$("#work-area-"+self.get_settings().widget_code).html(wgPageCode);
				//wgpage
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
				}else if(AMOCRM.data.current_entity == "contacts"){
					var queryUrl = 'https://' + window.location.hostname.split('.')[0] + '.amocrm.ru/api/v2/contacts?id=' + AMOCRM.data.current_card.id;
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
								for(var thsCntId=0; thsCntId<response._embedded.items[0].contacts.id.length; thsCntId++){
									var currentCardInfo = $.getJSON(
										'https://' + window.location.hostname.split('.')[0] + '.amocrm.ru/api/v2/contacts?id=' + response._embedded.items[0].contacts.id[thsCntId], 
										function ( cntResponse ){
											for(var thsCstFld=0; thsCstFld<cntResponse._embedded.items[0].custom_fields.length; thsCstFld++){
												if(cntResponse._embedded.items[0].custom_fields[thsCstFld].name == "Телефон"){
													for(var thsPhnVal=0; thsPhnVal<cntResponse._embedded.items[0].custom_fields[thsCstFld].values.length; thsPhnVal++){
														if (cntResponse._embedded.items[0].custom_fields[thsCstFld].values[thsPhnVal].value!='')
														{
														var numberPre = cntResponse._embedded.items[0].custom_fields[thsCstFld].values[thsPhnVal].value.replace(/\D+/g,"");
														if(numberPre.substring(0,2) == "80"){
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
														if (numberPre!='')
														$('#' + widgetTca + '_form_searchables_list').append('\
										<li data-value="+' + numberPre + '" class="control--select--list--item' + classPref + '">\
											<span class="control--select--list--item-inner" title="+' + numberPre + '">+' + numberPre + '</span>\
										</li>');
													}
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
					
					//окно пакупки				
					if (AMOCRM.constant('user_rights').is_admin && (self.get_settings().partner.length==0 || self.get_settings().partner == 'bs')) {
                       if ($('#biz-offer-item'==undefined))
					   {var offerItem = self.render(
						{ref: '/tmpl/settings/menu_item.twig'}, 
						{
							item: { label: 'Оплатить лицензию через партнёра', description: 'БИЗНЕС И СОФТ'}, 
							item_name: 'biz-offer-item'
						});
                        $('#filter_presets_holder #pay').before(offerItem);
						}
                    }//окно пакупки
					
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
//	return CustomWidget;
//});
