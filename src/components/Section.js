export { Section };

class Section {
  constructor({ items, renderer }, cardSelector) {
    this._renderer = renderer;
    this._renderedItems = items;
    this._container = document.querySelector(cardSelector);
  }
  renderItems() {
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

