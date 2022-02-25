export default class Component {
    $target;
    $props;
    $state;
    constructor($target, $props) {
        this.$target = $target;
        this.$props = $props; // $props 할당
        this.setup();
        this.setEvent();
        this.render();
    }
    setup() { };
    mounted() { };
    template() { return ''; }
    render() {
        this.$target.innerHTML = this.template();
        this.mounted(); // render 후에 mounted가 실행 된다.
    }
    setEvent() { }
    setState(newState) {
        this.$state = { ...this.$state, ...newState };
        this.render();
    }
    addEvent(eventType, selector, callback) {
        const children = [...this.$target.querySelectorAll(selector)];
        // selector에 명시한 것 보다 더 하위 요소가 선택되는 경우가 있을 땐
        // closest를 이용하여 처리한다.
        const isTarget = (target) => children.includes(target)
            || target.closest(selector);
        this.$target.addEventListener(eventType, event => {
            if (!isTarget(event.target)) return false;
            callback(event);
        })
    }
}


import Component from "./core/Component.js";
import Items from "./components/Items.js";
import ItemAppender from "./components/ItemAppender.js";
import ItemFilter from "./components/ItemFilter.js";

export default class App extends Component {

    setup() {
        this.$state = {
            isFilter: 0,
            items: [
                {
                    seq: 1,
                    contents: 'item1',
                    active: false,
                },
                {
                    seq: 2,
                    contents: 'item2',
                    active: true,
                }
            ]
        };
    }

    template() {
        return `
      <header data-component="item-appender"></header>
      <main data-component="items"></main>
      <footer data-component="item-filter"></footer>
    `;
    }

    // mounted에서 자식 컴포넌트를 마운트 해줘야 한다.
    mounted() {
        const { filteredItems, addItem, deleteItem, toggleItem, filterItem } = this;
        const $itemAppender = this.$target.querySelector('[data-component="item-appender"]');
        const $items = this.$target.querySelector('[data-component="items"]');
        const $itemFilter = this.$target.querySelector('[data-component="item-filter"]');

        // 하나의 객체에서 사용하는 메소드를 넘겨줄 bind를 사용하여 this를 변경하거나,
        // 다음과 같이 새로운 함수를 만들어줘야 한다.
        // ex) { addItem: contents => addItem(contents) }
        new ItemAppender($itemAppender, {
            addItem: addItem.bind(this)
        });
        new Items($items, {
            filteredItems,
            deleteItem: deleteItem.bind(this),
            toggleItem: toggleItem.bind(this),
        });
        new ItemFilter($itemFilter, {
            filterItem: filterItem.bind(this)
        });
    }

    get filteredItems() {
        const { isFilter, items } = this.$state;
        return items.filter(({ active }) => (isFilter === 1 && active) ||
            (isFilter === 2 && !active) ||
            isFilter === 0);
    }

    addItem(contents) {
        const { items } = this.$state;
        const seq = Math.max(0, ...items.map(v => v.seq)) + 1;
        const active = false;
        this.setState({
            items: [
                ...items,
                { seq, contents, active }
            ]
        });
    }

    deleteItem(seq) {
        const items = [...this.$state.items];;
        items.splice(items.findIndex(v => v.seq === seq), 1);
        this.setState({ items });
    }

    toggleItem(seq) {
        const items = [...this.$state.items];
        const index = items.findIndex(v => v.seq === seq);
        items[index].active = !items[index].active;
        this.setState({ items });
    }

    filterItem(isFilter) {
        this.setState({ isFilter });
    }

}

import Component from "../core/Component.js";

export default class ItemAppender extends Component {

    template() {
        return `<input type="text" class="appender" placeholder="아이템 내용 입력" />`;
    }

    setEvent() {
        const { addItem } = this.$props;
        this.addEvent('keyup', '.appender', ({ key, target }) => {
            if (key !== 'Enter') return;
            addItem(target.value);
        });
    }
}

import Component from "../core/Component.js";

export default class Items extends Component {

    template() {
        const { filteredItems } = this.$props;
        return `
      <ul>
        ${filteredItems.map(({ contents, active, seq }) => `
          <li data-seq="${seq}">
            ${contents}
            <button class="toggleBtn" style="color: ${active ? '#09F' : '#F09'}">
              ${active ? '활성' : '비활성'}
            </button>
            <button class="deleteBtn">삭제</button>
          </li>
        `).join('')}
      </ul>
    `
    }

    setEvent() {
        const { deleteItem, toggleItem } = this.$props;

        this.addEvent('click', '.deleteBtn', ({ target }) => {
            deleteItem(Number(target.closest('[data-seq]').dataset.seq));
        });

        this.addEvent('click', '.toggleBtn', ({ target }) => {
            toggleItem(Number(target.closest('[data-seq]').dataset.seq));
        });

    }

}

import Component from "../core/Component.js";

export default class ItemFilter extends Component {

    template() {
        return `
      <button class="filterBtn" data-is-filter="0">전체 보기</button>
      <button class="filterBtn" data-is-filter="1">활성 보기</button>
      <button class="filterBtn" data-is-filter="2">비활성 보기</button>
    `
    }

    setEvent() {
        const { filterItem } = this.$props;
        this.addEvent('click', '.filterBtn', ({ target }) => {
            filterItem(Number(target.dataset.isFilter));
        });
    }
}
