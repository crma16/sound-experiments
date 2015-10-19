import Section from 'lib/components/Section';

export default class Home extends Section {
  constructor($el) {
    super($el);

    console.log('Home - Construct');
  }

  onInit() {
    console.log('Home - Init');
  }
}
