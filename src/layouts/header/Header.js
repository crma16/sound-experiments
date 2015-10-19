import Component from 'lib/components/Component';

export default class Header extends Component {
  constructor($el) {
    super($el);

    console.log('Header - Construct');
  }

  onInit() {
    console.log('Header - Init');
  }
}