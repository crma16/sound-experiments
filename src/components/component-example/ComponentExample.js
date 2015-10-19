import Component from 'lib/components/Component';

export default class ComponentExample extends Component {
  constructor($el) {
    super($el);

    console.log('Component example - constructor');
  }

  onInit() {
    console.log('Component example - init');
  }
}
