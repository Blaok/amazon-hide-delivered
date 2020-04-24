// ==UserScript==
// @name         Amazon Hide Delivered
// @namespace    https://github.com/Blaok/amazon-hide-delivered
// @version      0.1
// @description  Hide delivered items on amazon.com.
// @author       Blaok Chi
// @match        https://www.amazon.com/gp/your-account/order-history*
// @grant        none
// ==/UserScript==

'use strict';

function toggleDelivered() {
  var toggleDelivererdElem = document.getElementById("toggle-delivered");
  var showDelivered = toggleDelivererdElem.innerHTML == 'Show Delivered';

  Array.from(document.getElementsByClassName('order')).forEach((order) => {
    if (showDelivered) {
      order.style = null;
    } else if (order.getElementsByClassName('shipment-is-delivered').length > 0 ||
      order.innerHTML.match('Delivered')) {
      order.style.display = 'none';
    }
  });

  if (showDelivered) {
    toggleDelivererdElem.innerHTML = 'Hide Delivered'
  } else {
    toggleDelivererdElem.innerHTML = 'Show Delivered'
  }
}

var elems = document.getElementsByClassName("top-controls");
if (elems.length == 1) {
  elems[0].innerHTML += '<span class="a-button a-button-primary"><span class="a-button-inner"><div class="a-button-text" role="button" id="toggle-delivered"">Hide Delivered</div></span></span>';
  document.getElementById("toggle-delivered").addEventListener('click', toggleDelivered);
  toggleDelivered();
} else {
  console.log('unexpected web page: too many top-controls');
}
