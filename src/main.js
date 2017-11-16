// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import app from './app';
import './init';
import { boot as keyMapBoot, } from'./key-map';

keyMapBoot();

Vue.config.productionTip= false;

/* eslint-disable no-new */
new Vue( {
	el: '#main',
	template: '<app/>',
	components: { app, },
} );
