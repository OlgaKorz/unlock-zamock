import UIkit from "uikit";
import axios from "axios";
import IMask from "imask";

function main() {   
        /* mask */
    var phoneElements = document.querySelectorAll('.client-phone');
    
    var maskOptions = {
        mask: '{+38} ({\\0}00) 000-00-00',
        lazy: false,
    };

    for (let i = 0; i < phoneElements.length; i++) {
        phoneElements[i]._mask = IMask(phoneElements[i], maskOptions);
    }

    /* forms */
    for (var i = 0; i < document.forms.length; i++) {
        document.forms[i].addEventListener('submit', function(e) {
            e.preventDefault();
          
            var form = e.target;
          
            var elements = form.elements;
          
            var data = {};
          
            for (var j = 0; j < elements.length; j++) {
                if (!elements[j].name) continue;
              
                if (elements[j].name === 'client-phone') {
                    data[elements[j].name] = elements[j]._mask._unmaskedValue;
                } else {
                    data[elements[j].name] = elements[j].value;
                }
            }

          axios.post('telegram.php', data)
              .then(function(res) {
                  UIkit.notification({ message: 'Ваша заявка успішно відправлена!', status: 'success' });
                   
                  form.reset();
                  
                  var phone = form.querySelector('.client-phone');
                  
                  if (phone._mask) {
                      phone._mask.destroy();
                      phone._mask = IMask(phone, maskOptions);
                  }
              })
              .catch(function(err) {
                  UIkit.notification({ message: 'Під час відправлення форми сталася помилка. Спробуйте ще раз, або зв\'яжіться з нами по телефону!', status: 'warning' });
                  console.log(err);
              })
      })
  }
}
if (document.readyState === 'complete') {
  main();
} else {
  document.addEventListener('DOMContentLoaded', main);
}


// const counters = document.querySelectorAll('.counters span');
// const container = document.querySelector('.counters');
// let activated = false;
// window.addEventListener('scroll', () => {
//     if(
//         scrollY > container.offsetTop - container.offsetHeight - 300
//         && activated === false) {
//             counters.forEach(counter => {
//                 counter.innerText = 0;
//                 let count = 0;
//                 function updateCount() {
//                     const target = parseInt(counter.dataset.count);
//                     if( count < target ) {
//                         count++;
//                         counter.innerText = count;
//                         setTimeout(updateCount, 50);
//                     } else {
//                         counter.innerText = target;
//                     }
//                 }
//                 updateCount();
//                 activated = true;
//             });
//         } else if(
//             scrollY < container.offsetTop - container.offsetHeight - 600
//             || scrollY === 0
//             && activated === true
//         ) {
//             counters.forEach(counter => {
//                 counter.innerText = 0;
//             });
//             activated = false;
//         }
//     });