import QUnit from 'steal-qunit';
import F from 'funcunit';
import $ from 'jquery';
import stache from 'can/view/stache/';
import { ViewModel } from './list';

F.attach(QUnit);

// ViewModel unit tests
QUnit.module('app/restaurant/list ViewModel');

QUnit.test('Has message', function(){
  var vm = new ViewModel();
  QUnit.equal(vm.attr('message'), 'This is the app-restaurant-list component');
});

// Component functional unit tests
QUnit.module('app/restaurant/list Component');

const template = stache(`<app-restaurant-list></app-restaurant-list>`);

QUnit.test('Component works', function(){
  $('#qunit-fixture').html(template({}));
  F('app-restaurant-list').exists('Component initialized');
  F('app-restaurant-list').html('<p>This is the app-restaurant-list component</p>',
    'Component has text');
});
