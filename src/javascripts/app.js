document.addEventListener("DOMContentLoaded", function() {
  var $remodalInst = $('[data-remodal-id=modal]').remodal();
  var $remodalSuccessInst = $('[data-remodal-id=modal-success]').remodal();

  var translations = {
    type: 'Наименование',
    name: 'Имя',
    phone: 'Телефон',
    address: 'Адрес',
    comment: 'Комментарий'
  }

  var $form = $('[data-form]');
  var API_KEY = '319249234:AAF-N4gpOGzi6ssvpmQElneX3GGuT33yW7U';
  var CHAT_ID = 102286203;

  $form.on('submit', function(event){
    event.preventDefault();

    var formData = $form.serializeArray()
    var message = "-------------\nНовый заказ:\n\n"

    $.each(formData, function(index, field){
      if (!field.value) { return false }
      message += translations[field.name] + ": " + field.value + '\n\n'
    });

    $.ajax({
      type: "POST",
      url: "https://api.telegram.org/bot" + API_KEY + "/sendMessage",
      data: JSON.stringify({chat_id: CHAT_ID, text: message}),
      contentType: 'application/json',
      success: function(msg){
        $remodalInst.close()
        $form[0].reset()
        $remodalSuccessInst.open()
      },
      error: function(error){
      }
    });

  });
});