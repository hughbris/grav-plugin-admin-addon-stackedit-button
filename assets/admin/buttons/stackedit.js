(function($){
	$(function(){
		const stackOptions = {
			url: 'https://stackedit.net/app',
			};

		$('body').on('grav-editor-ready', function(event) {

			var Instance = Grav.default.Forms.Fields.EditorField.Instance;
			// TODO: ideally check here for data attribute or (unfortunately) class=stackedit, however addButton actually adds to all EditorFields not just the "instance", so this is being accomplished with messy admin CSS.
			Instance.addButton({
				'open-stackeditplus': {
					identifier: 'open-stackeditplus',
					title: 'Edit with Stackedit+',
					label: '<i class="stackedit"></i>',
					modes: ['gfm', 'markdown'],
					action: function(_ref) {
						var codemirror = _ref.codemirror, button = _ref.button;

						button.on('click.editor.open-stackeditplus', function() {

							const stackedit = new Stackedit(stackOptions);

							// Open the iframe
							stackedit.openFile({
								// name: 'Filename', // optional filename, seems pointless?
								content: {
									text: codemirror.getValue(), // Markdown content.
									},
								});

							// Listen to StackEdit events and apply the changes to the codemirror
							stackedit.on('fileChange', (file) => {
								codemirror.setValue(file.content.text);
								});
						});
					},
				},
				},
				'end'); // {options}: before, after
			});
		});
	})(jQuery);
