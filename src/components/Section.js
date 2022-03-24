export { Section };

class Section {
  constructor({ renderer }, cardSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(cardSelector);
  }
  renderItems(items) {
    this._renderedItems = items;
    this._renderedItems.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

