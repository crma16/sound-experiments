import Section from 'lib/components/Section';

export default class About extends Section {
  constructor($el) {
    super($el);

    console.log('About - Construct');
  }

  onInit() {
    console.log('About - Init');
  }
}
