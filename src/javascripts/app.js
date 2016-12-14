import $ from 'jquery'
import Remodal from 'remodal'
import Inputmask from 'jquery.inputmask/dist/inputmask/inputmask.js'
import ENV from '../../env.js'

document.addEventListener("DOMContentLoaded", function() {
  var remodalOptions = {hashTracking: false}
  var $remodalInst = $('[data-remodal-id=modal]').remodal(remodalOptions);
  var $remodalSuccessInst = $('[data-remodal-id=modal-success]').remodal(remodalOptions);
  var $remodalErrorInst = $('[data-remodal-id=modal-error]').remodal(remodalOptions);

  var phoneMask = new Inputmask("+7(999)999-99-99");
  phoneMask.mask(document.getElementById("phone"));

  var translations = {
    type: 'Наименование',
    name: 'Имя',
    phone: 'Телефон',
    address: 'Адрес',
    comment: 'Комментарий'
  }

  var $form = $('[data-form]');
  var BOT_API_KEY = '319249234:AAF-N4gpOGzi6ssvpmQElneX3GGuT33yW7U';
  var CHAT_ID = 102286203;

  $form.on('submit', function(event){
    event.preventDefault();

    var formData = $form.serializeArray();
    var message = "-------------\nНовый заказ:\n\n";

    $.each(formData, function(index, field){
      if (!field.value) { return false }
      message += translations[field.name] + ": " + field.value + '\n\n';
    });

    $.ajax({
      type: "POST",
      url: "https://api.telegram.org/bot" + ENV.BOT_API_KEY + "/sendMessage",
      data: JSON.stringify({chat_id: ENV.CHAT_ID, text: message}),
      contentType: 'application/json',
      success: function(msg){
        $remodalInst.close()
        $form[0].reset()
        $remodalSuccessInst.open()
      },
      error: function(error){
        $remodalInst.close()
        $remodalErrorInst.open()
      }
    });

  });
});