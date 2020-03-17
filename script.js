//define(['jquery', 'lib/components/base/modal'], function($, Modal){
	var CustomWidget = function () {
		var self = this, system = self.system(), widgetTca = 'bizandsoft_retask', widgetPath = 'retask2', currentUser = $('.n-avatar').first().attr('id'), serverName = 'amo.bizandsoft.ru';

		self.checkNotifications = function()
			{
			var link = 'https://' + serverName + '/' + widgetPath + '/'+system.subdomain+'/notif';
			self.crm_post(
				link,
					{
					amo_domain: 	system.subdomain,
					amouser_id: system.amouser_id,
					key: self.MD5(system.amouser + system.amohash)
					},
				function (serverResponse)
					{
					if(self.isJson(serverResponse))
						{
						result = serverResponse;
						self.add_notify(JSON.parse(serverResponse));
						return result;
						}
					},
				'text',
				function ()
					{
					return null;
					}
			)
			}

			self.isJson = function (item)
				{
				item = typeof item !== "string"
						? JSON.stringify(item)
						: item;

				try {
						item = JSON.parse(item);
				} catch (e) {
						return false;
				}

				if (typeof item === "object" && item !== null) {
						return true;
				}

				return false;
				}

			self.postNotificationsRes = function(id, show)
				{
				var link = 'https://' + serverName + '/' + widgetPath + '/'+system.subdomain+'/notif';
				self.crm_post(
					link,
						{
						amo_domain: 	system.subdomain,
						amouser_id: system.amouser_id,
						key: self.MD5(system.amouser + system.amohash),
						message_id: id,
						show: show,
						},
					function (json)
						{
						},
					'text',
					function ()
						{

						}
					)
				}


		self.add_notify = function (mess)
			{
			var w_name = "Виджет " + self.i18n('widget').name,
						date_now = Math.ceil(Date.now() / 1000),
						lang = false;
			var message_params = {
				header: w_name,
				text: mess.text,
				date: date_now,
				link: mess.link
				};
			if(mess.show == true && mess.type == "error")
				{
				AMOCRM.notifications.add_error(message_params);
				}
			//default:
			if(mess.show == true && mess.type !== "error")
				{
				AMOCRM.notifications.show_message(message_params);
				}
			self.postNotificationsRes(mess.id, false);
			}


		self.postInstallStatus = function(installState, partnerCode, phone)
			{
			var operationReason = null;
			switch(installState)
				{
				case	'install': // виджет не установлен!
				operationReason = 'disabled';
				break;
				case 'installed': // виджет установлен
				operationReason = 'install';
				break;
				case 'not_configured': // не настроен
				operationReason = 'install';
					break;
				default:
				operationReason = 'install';
				}

			self.crm_post(
				'https://' + serverName + '/' + widgetPath + '/'+system.subdomain+'/register',
				{
					amo_domain: 	system.subdomain,
					amo_user:		system.amouser,
					amo_current:	system.amouser_id,
					amo_key: 		system.amohash,
					phone:			phone,
					partner:		partnerCode,
					reason:			operationReason
				}
			);
			}


		self.MD5 = function(d){result = M(V(Y(X(d),8*d.length)));return result.toLowerCase()};function M(d){for(var _,m="0123456789ABCDEF",f="",r=0;r<d.length;r++)_=d.charCodeAt(r),f+=m.charAt(_>>>4&15)+m.charAt(15&_);return f}function X(d){for(var _=Array(d.length>>2),m=0;m<_.length;m++)_[m]=0;for(m=0;m<8*d.length;m+=8)_[m>>5]|=(255&d.charCodeAt(m/8))<<m%32;return _}function V(d){for(var _="",m=0;m<32*d.length;m+=8)_+=String.fromCharCode(d[m>>5]>>>m%32&255);return _}function Y(d,_){d[_>>5]|=128<<_%32,d[14+(_+64>>>9<<4)]=_;for(var m=1732584193,f=-271733879,r=-1732584194,i=271733878,n=0;n<d.length;n+=16){var h=m,t=f,g=r,e=i;f=md5_ii(f=md5_ii(f=md5_ii(f=md5_ii(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_hh(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_gg(f=md5_ff(f=md5_ff(f=md5_ff(f=md5_ff(f,r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+0],7,-680876936),f,r,d[n+1],12,-389564586),m,f,d[n+2],17,606105819),i,m,d[n+3],22,-1044525330),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+4],7,-176418897),f,r,d[n+5],12,1200080426),m,f,d[n+6],17,-1473231341),i,m,d[n+7],22,-45705983),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+8],7,1770035416),f,r,d[n+9],12,-1958414417),m,f,d[n+10],17,-42063),i,m,d[n+11],22,-1990404162),r=md5_ff(r,i=md5_ff(i,m=md5_ff(m,f,r,i,d[n+12],7,1804603682),f,r,d[n+13],12,-40341101),m,f,d[n+14],17,-1502002290),i,m,d[n+15],22,1236535329),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+1],5,-165796510),f,r,d[n+6],9,-1069501632),m,f,d[n+11],14,643717713),i,m,d[n+0],20,-373897302),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+5],5,-701558691),f,r,d[n+10],9,38016083),m,f,d[n+15],14,-660478335),i,m,d[n+4],20,-405537848),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+9],5,568446438),f,r,d[n+14],9,-1019803690),m,f,d[n+3],14,-187363961),i,m,d[n+8],20,1163531501),r=md5_gg(r,i=md5_gg(i,m=md5_gg(m,f,r,i,d[n+13],5,-1444681467),f,r,d[n+2],9,-51403784),m,f,d[n+7],14,1735328473),i,m,d[n+12],20,-1926607734),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+5],4,-378558),f,r,d[n+8],11,-2022574463),m,f,d[n+11],16,1839030562),i,m,d[n+14],23,-35309556),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+1],4,-1530992060),f,r,d[n+4],11,1272893353),m,f,d[n+7],16,-155497632),i,m,d[n+10],23,-1094730640),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+13],4,681279174),f,r,d[n+0],11,-358537222),m,f,d[n+3],16,-722521979),i,m,d[n+6],23,76029189),r=md5_hh(r,i=md5_hh(i,m=md5_hh(m,f,r,i,d[n+9],4,-640364487),f,r,d[n+12],11,-421815835),m,f,d[n+15],16,530742520),i,m,d[n+2],23,-995338651),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+0],6,-198630844),f,r,d[n+7],10,1126891415),m,f,d[n+14],15,-1416354905),i,m,d[n+5],21,-57434055),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+12],6,1700485571),f,r,d[n+3],10,-1894986606),m,f,d[n+10],15,-1051523),i,m,d[n+1],21,-2054922799),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+8],6,1873313359),f,r,d[n+15],10,-30611744),m,f,d[n+6],15,-1560198380),i,m,d[n+13],21,1309151649),r=md5_ii(r,i=md5_ii(i,m=md5_ii(m,f,r,i,d[n+4],6,-145523070),f,r,d[n+11],10,-1120210379),m,f,d[n+2],15,718787259),i,m,d[n+9],21,-343485551),m=safe_add(m,h),f=safe_add(f,t),r=safe_add(r,g),i=safe_add(i,e)}return Array(m,f,r,i)}function md5_cmn(d,_,m,f,r,i){return safe_add(bit_rol(safe_add(safe_add(_,d),safe_add(f,i)),r),m)}function md5_ff(d,_,m,f,r,i,n){return md5_cmn(_&m|~_&f,d,_,r,i,n)}function md5_gg(d,_,m,f,r,i,n){return md5_cmn(_&f|m&~f,d,_,r,i,n)}function md5_hh(d,_,m,f,r,i,n){return md5_cmn(_^m^f,d,_,r,i,n)}function md5_ii(d,_,m,f,r,i,n){return md5_cmn(m^(_|~f),d,_,r,i,n)}function safe_add(d,_){var m=(65535&d)+(65535&_);return(d>>16)+(_>>16)+(m>>16)<<16|65535&m}function bit_rol(d,_){return d<<_|d>>>32-_}

		self.getTemplate = function (template, params, callback) {
						params = (typeof params == 'object') ? params : {};
						template = template || '';

						return self.render({
								href: '/templates/' + template + '.twig',
								base_path: self.params.path,
								load: callback
						}, params);
				}

		this.callbacks = {
			settings: function(modal_body){
					 self.getTemplate(
										'consent',
										{},
										function (template) {
												modal_body.find('input[name="consent"]').val('');
												modal_body.find('.widget_settings_block').append(template.render());
												var $install_btn = $('button.js-widget-install'),
												consent_error = $('div.consent_error');
												modal_body.find('input[name="consent_check"]').on('change', function (e) {

														var $checkbox = $(e.currentTarget);
														if ($checkbox.prop('checked')) {
																modal_body.find('input[name="consent"]').val('1');
																consent_error.addClass('hidden');
														} else {
																modal_body.find('input[name="consent"]').val('');
														}
												});

												$install_btn.on('click', function () {
														if (!modal_body.find('input[name="consent"]').val()) {
																consent_error.removeClass('hidden');
														}
												});
										}
								);

				return true;
			},
			onSave: function () {

					var partnerCode = $('.widget_settings_block__controls__.text-input[name=partner]').val();
					var phone = $('.widget_settings_block__controls__.text-input[name=customer]').val();

					setTimeout(function() {
						var installState = self.get_install_status();
						self.postInstallStatus(installState, partnerCode, phone);
					}, 3000);

					return true;

			},
			init: function () {
			var notifications = self.checkNotifications();
			var phone = self.get_settings().customer;
			var parameter;
			parameter.phone = 'par' + phone;
			parameter.text = 'text1';
			self.set_settings(parameter);
			var settingsWidget = self.get_settings();
			console.dir(settingsWidget);
			return true;
			},
			bind_actions: function () {
				$('.' + widgetTca + '-button').on('click', function () {
					var partner = self.get_settings().partner;
					$('.' + widgetTca + '_mgc-template-modal').remove();
					var searchForm = '\
					<form id="form">\
						<iframe src="https://' + serverName + '/' + widgetPath + '/index.php?\
							dom=' + window.location.hostname.split('.')[0] + '&\
							key=' + self.MD5(system.amouser + system.amohash) + '&\
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
										<h2 class="' + widgetTca + '-action__caption head_2">Настройки</h2>\
										<div class="' + widgetTca + '-action__top-controls">\
											<button type="button" class="button-input button-cancel ' + widgetTca + '_bye">✕</button>\
										</div>\
									</div>\
									' + searchForm + '\
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
										 <button type="button" class="button-input	button-input_blue" style="margin: auto;" id="biz-offer-accept">\
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
											<button type="button" class="button-input	button-input_blue" style="margin: auto;" id="biz-offer-accept-send">\
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
										}
														});
												});
						});
						}


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



				var lang = self.i18n('userLang');
				w_code = self.get_settings().widget_code;
				if (typeof(AMOCRM.data.current_card) != 'undefined') {
					if (AMOCRM.data.current_card.id == 0) {
						return false;
					}
				}
				self.render_template({
					caption: {
						class_name: widgetTca + '_js-ac-caption',
						html: ''
					},
					body: '',
					render: '\
						<div class="' + widgetTca + '_ac-form">\
							<div class="' + widgetTca + '-button ' + widgetTca + '_ac_sub">Настройки</div>\
						</div>\
						<link type="text/css" rel="stylesheet" href="' + self.get_settings().path + '/style.css?v='+self.get_settings().version+'">'
				});
				//добавление пунка меню с предложением оплаты
				if (AMOCRM.constant('user_rights').is_admin && (self.get_settings().partner.length==0 || self.get_settings().partner == 'bs'))
				{
					//#biz-offer-item - id элемента пункта меню
					if ($('#biz-offer-item'==undefined))
					{
						var offerItem = self.render(
						{ref: '/tmpl/settings/menu_item.twig'},
						{
							item: { label: 'Оплатить лицензию через партнёра', description: 'БИЗНЕС И СОФТ'},
							item_name: 'biz-offer-item'
						});
						//#filter_presets_holder #pay - id стандартного пункта "Счет и оплата"
						$('#filter_presets_holder #pay').before(offerItem);
					}
				}
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
