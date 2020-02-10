var CustomWidget = function () {
		var self = this, system = self.system(), widgetTca = 'bizandsoft_retask', widgetPath = 'retask2', currentUser = $('.n-avatar').first().attr('id'), serverName = 'amo.bizandsoft.ru';
		this.callbacks = {
			settings: function(){
				console.log('settings');
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
					$('.widget_settings_block__fields').append('\
					<div class="widget_settings_block__item_field">\
						<label class="control-checkbox checkboxes_dropdown__label is-checked">\
							<div class="control-checkbox__body">\
								<input type="checkbox" class="js-item-checkbox" name="" id="' + widgetTca + '_accept" value="" data-value="1">\
								<span class="control-checkbox__helper"></span>\
							</div>\
							<div class="control-checkbox__text element__text checkboxes_dropdown__label_title" style="white-space: normal;">\
								Я подтверждаю согласие на передачу данных аккаунта amoCRM на сервера компании «Бизнес и софт» с целью обеспечения работоспособности виджета\
							</div>\
						</label>\
					</div>');
				}
				$('.modal-body').append('\
					<div style="' + tcaWdgVersionStyleInc + '">\
						<table style="width:100%;border-top:3px solid #467ec2;">\
							<tbody>\
								<tr>\
									<td style="width:200px;border: 0;padding-top:5px;padding-left:10px;padding-bottom: 10px;">\
										<a href="https://bizandsoft.ru" target="_blank">\
											<div style="width: 200px;height:50px;background-image:url(\'https://amo.bizandsoft.ru/assets/images/bizandsoft_logo.png\');background-repeat:no-repeat;background-size:contain;background-position: left center;"></div>\
										</a>\
									</td>\
									<td style="border: 0;vertical-align:middle;text-align:right;padding-right:15px;font-size:11pt;">\
										<span style="font-weight: bold;">\
											Остались вопросы? Будем рады помочь!\
										</span>\
										<br>\
										<a href="mailto:amoprog@bizandsoft.ru" style="color: inherit;text-decoration: none;border-bottom: 1px solid #e5e5e5;">amoprog@bizandsoft.ru</a> \
										<a href="tel:+74712773120" style="color: inherit;text-decoration: none;border-bottom: 1px solid #e5e5e5;">+7 (4712) 773-120</a>\
									</td>\
								</tr>\
							</tbody>\
						</table>\
					</div>');
				return true;
			},
			onSave: function () {
				console.log('onsave');
				var onSaveAccepted = false;
				var isUninstall = false;
				if($('.widget-settings__base-space').length > 0){
					if($('body').find('.widget-state.widget-state_status_installed').length == 0){
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
							onSaveAccepted = false;
						}else{
							$('#' + widgetTca + '_agreement_error').css('display', 'none');
							$('#' + widgetTca + '_accept_tense')
								.css('color', 'inherit');
							onSaveAccepted = true;
						}
					}else{
						onSaveAccepted = true;
						isUninstall = true;
					}
				}else{
					if($('#widget_active__sw').length > 0){
						onSaveAccepted = true;
						isUninstall = true;
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
							onSaveAccepted = false;
						}else{
							$('#' + widgetTca + '_agreement_error_old').css('display', 'none');
							$('#' + widgetTca + '_accept_tense')
								.css('color', 'inherit');
							onSaveAccepted = true;
						}
					}
				}
				if(onSaveAccepted){
					console.log('onsaveaccepted');
					var partnerCode = $('.widget_settings_block__controls__.text-input[name=partner]').val();
					var widgetKey	= $('.widget_settings_block__controls__.text-input[name=widget_key]').val();
					self.crm_post(
						'https://' + serverName + '/' + widgetPath + '/register.php?type=automated',
						{
							amo_domain: 	system.subdomain,
							amo_user:		system.amouser,
							amo_current:	system.amouser_id,
							amo_key: 		system.amohash,
							partner:		partnerCode,
							widget_key:		widgetKey,
							operation:		isUninstall
						}
					);
					return true;
				}else{
					return false;
				}
			},
			init: function () {
				return true;
			},
			bind_actions: function () {
				$('.' + widgetTca + '-button').on('click', function () {
					var wdgKey = self.get_settings().widget_key;
					var partner = self.get_settings().partner;
					if(wdgKey.length == 0){
						wdgKey = 'undefined';
					}
					if(partner.length == 0){
						partner = 'bs';
					}
					$('.' + widgetTca + '_mgc-template-modal').remove();
					$searchForm = '\
					<form id="form">\
						<iframe src="https://' + serverName + '/' + widgetPath + '/index.php?\
							dom=' + window.location.hostname.split('.')[0] + '&\
							amouser=' + system.amouser + '&\
							amohash=' + system.amohash + '&\
							key=' + wdgKey + '&\
							current=' + currentUser + '&\
							partner=' + partner + '" \
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
										<h2 class="' + widgetTca + '-action__caption head_2">Поиск дубликатов контактов</h2>\
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
				return true;
			},
			render: function () {
				console.log('render');
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
							<div class="' + widgetTca + '-button ' + widgetTca + '_ac_sub">Начать поиск дубликатов</div>\
						</div>\
						<link type="text/css" rel="stylesheet" href="' + self.get_settings().path + '/style.css">'
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
