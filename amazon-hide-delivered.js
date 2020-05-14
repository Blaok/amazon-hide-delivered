// ==UserScript==
// @name         Amazon Hide Delivered
// @namespace    https://github.com/Blaok/amazon-hide-delivered
// @version      0.2
// @description  Hide delivered items on amazon.com.
// @author       Blaok Chi
// @match        https://www.amazon.com/gp/*/order-history*
// @grant        none
// @run-at       document-start
// ==/UserScript==

'use strict';

function toggleDelivered(action = 'toggle') {
  var toggleDelivererdElem = document.getElementById('toggle-delivered');
  var showDelivered = toggleDelivererdElem.innerHTML == 'Show Delivered';
  if (action == 'hide') {
    showDelivered = false;
  }

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

function init() {
  var toggleButton = document.getElementById('toggle-delivered');
  var elems = document.getElementsByClassName("top-controls");
  if (elems.length == 1) {
    if (toggleButton == null) {
      elems[0].innerHTML += '<span class="a-button a-button-primary"><span class="a-button-inner"><div class="a-button-text" role="button" id="toggle-delivered"">Hide Delivered</div></span></span>';
      document.getElementById('toggle-delivered').addEventListener('click', toggleDelivered);
    }
    toggleDelivered('hide');
  }
  if (document.readyState != 'complete') {
    setTimeout(init, 100);
  }
}

init();
