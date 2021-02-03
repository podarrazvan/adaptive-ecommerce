// tslint:disable:max-line-length
export const Init = {
  height: '350px',
  menubar: 'file edit view insert format tools table help',
  toolbar:
    'undo redo | bold italic | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify |  numlist bullist | forecolor backcolor | fullscreen  preview print | link | code',
  // other toolbar options: emoticons pagebreak save template codesample anchor a11ycheck ltr rtl charmap strikethrough checklist insertfile image media pageembed underline outdent indent
  plugins:
    'print preview fullpage importcss tinydrive searchreplace autolink autosave save directionality visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help  charmap emoticons code',
  // other plugin options: a11ychecker advcode mediaembed checklist tinymcespellchecker
  init_instance_callback: (el: any) => {}
};
