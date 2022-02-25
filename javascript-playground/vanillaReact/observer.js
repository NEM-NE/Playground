let currentObserver = null;

export const observe = fn => {
    currentObserver = fn;
    fn();
    currentObserver = null;
}

export const observable = obj => {
    Object.keys(obj).forEach(key => {
        let _value = obj[key];
        const observers = new Set();

        Object.defineProperty(obj, key, {
            get() {
                if (currentObserver) observers.add(currentObserver);
                return _value;
            },

            set(value) {
                _value = value;
                observers.forEach(fn => fn());
            }
        })
    })
    return obj;
}

import { observable, observe } from './observer.js';

export class Component {
    state; props; $el;

    constructor($el, props) {
        this.$el = $el;
        this.props = props;
        this.setup();
    }

    setup() {
        this.state = observable(this.initState()); // state를 관찰한다.
        observe(() => { // state가 변경될 경우, 함수가 실행된다.
            this.render();
            this.setEvent();
            this.mounted();
        });
    }

    initState() { return {} }
    template() { return ''; }
    render() { this.$el.innerHTML = this.template(); }
    setEvent() { }
    mounted() { }
}


import { Component } from "./core/Component.js";

export class App extends Component {
    initState() {
        return {
            a: 10,
            b: 20,
        }
    }

    template() {
        const { a, b } = this.state;
        return `
      <input id="stateA" value="${a}" size="5" />
      <input id="stateB" value="${b}" size="5" />
      <p>a + b = ${a + b}</p>
    `;
    }

    setEvent() {
        const { $el, state } = this;

        $el.querySelector('#stateA').addEventListener('change', ({ target }) => {
            state.a = Number(target.value);
        })

        $el.querySelector('#stateB').addEventListener('change', ({ target }) => {
            state.b = Number(target.value);
        })
    }
}

import { App } from "./App.js";

new App(document.querySelector('#app'));