var CustomWidget = function () {
		var self = this, system = self.system(), widgetTca = 'bizandsoft_retask', widgetPath = 'retask2', widgetRusName = "Перенос задач", currentUser = $('.n-avatar').first().attr('id'), serverName = 'amo.bizandsoft.ru', notify_data = {};

		self.checkNotifications = function()
			{
			console.log('checkNotifications-07-13-52');
			var link = 'https://' + serverName + '/' + widgetPath + '/notifications.php?dom=' + window.location.hostname.split('.')[0] +
			'&key=' + self.MD5(system.amouser + system.amohash) + '&amouser_id'= + system.amouser_id;
			console.log(link);
			self.crm_post(
				link,
					{
					amo_domain: 	system.subdomain
					},
				function (json)
					{
					console.log(json);
					if(json)
						{
						result = json;
						self.add_notify(JSON.parse(json));
						return result;
						}
					},
				'text',
				function ()
					{
					console.log('Error');
					return null;
					}
			)
			}


			self.postNotificationsRes = function(id, show)
				{
				console.log('postNotificationsRes');
				var link = 'https://' + serverName + '/' + widgetPath + '/notifications.php?dom=' + window.location.hostname.split('.')[0] +
				'&key=' + self.MD5(system.amouser + system.amohash);
				console.log(link);
				self.crm_post(
					link,
						{
						amo_domain: 	system.subdomain,
						key: self.MD5(system.amouser + system.amohash),
						message_id: id,
						show: show,
						},
					function (json)
						{
						console.log(json);
						},
					'text',
					function ()
						{
						console.log('Error');
						}
				)
				}


			self.add_notify = function (mess) {
				console.dir(mess);
				if(mess.show == true)
					{
					var w_name = "Виджет " + widgetRusName,
							date_now = Math.ceil(Date.now() / 1000),
							lang = false;

					var error_params = {
					header: w_name,
					text: mess.text,
					date: date_now,
					link: mess.link
					};
					AMOCRM.notifications.add_error(error_params);
				}
			}



		self.add_call_notify = function (mess) {
			console.dir(mess);
			if(mess.show == true)
				{
				var w_name = "Виджет " + widgetRusName,
						date_now = Math.ceil(Date.now() / 1000),
						lang = false;
				/*
						n_data = {
							header: w_name,
							text: mess.text,
							date: date_now,
							link: "https://bizandsoft.ru/"
						};

				console.dir(n_data);
				*/
				var call_params = {
			    text: mess.text,
			    date: date_now,
			    from: "Виджет " + "Перенос задач",
			    to: "You: " + mess.text ,
			    click_link: mess.link,
				};

				console.dir(call_params);
				AMOCRM.notifications.add_call(call_params);
				self.postNotificationsRes(mess.id, false);
				}
		};

		self.postInstallStatus = function(installState, partnerCode, phone)
			{
			var operationReason = null;
			switch(installState)
				{
				case  'install': // виджет не установлен!
				operationReason = 'disabled';
				break;
				case 'installed': // виджет установлен
				operationReason = 'install';
				break;
				case 'not_configured': // не настроен
				operationReason = 'install';
				console.log(operationReason);
				break;
				default:
				operationReason = 'install';
				}

			console.log('operationReason line 49 == ' + operationReason);

			self.crm_post(
				'https://' + serverName + '/' + widgetPath + '/register.php?type=automated',
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
					console.log("settings");
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
					console.log("onsave");
					var partnerCode = $('.widget_settings_block__controls__.text-input[name=partner]').val();
					var phone = $('.widget_settings_block__controls__.text-input[name=phone]').val();

					setTimeout(function() {
						var installState = self.get_install_status();
						console.log(installState);
						self.postInstallStatus(installState, partnerCode, phone);
					}, 3000);

					return true;

			},
			init: function () {
				console.log('init');
				var notifications = self.checkNotifications();
				console.dir(notifications);


				/*
				AMOCRM.addNotificationCallback(self.get_settings().widget_code, function (data) {
					console.log(data)
				});
				*/
			return true;
			},
			bind_actions: function () {
				console.log("bind_actions");
				console.log(self.MD5(system.amouser + system.amohash));
				$('.' + widgetTca + '-button').on('click', function () {
					var partner = self.get_settings().partner;
					$('.' + widgetTca + '_mgc-template-modal').remove();
					console.log(self.MD5(system.amouser + system.amohash));
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

				return true;

			},
			render: function () {
				console.log("render");

				var installState = self.get_install_status();
				console.log(installState);

				var lang = self.i18n('userLang');
				console.dir(self.i18n);
				console.dir(lang);
				console.dir(self.i18n('widget').name);
				//self.add_call_notify({text: 'Через 2 дня заканчивается тестовый период, если Вам понравился наш виджет, произведите оплату.'});
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


				return true;
			},
			destroy: function () {
				console.log('destroy');
				var installState = self.get_install_status();
				console.log(installState);

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
