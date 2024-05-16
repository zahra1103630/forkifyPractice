import { View } from './Viwe';
import icon from 'url:../img/icons.svg';
import previewView from './previewView';

class BookmarksView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errorMessage = 'No bookmark yet .find nice recipe and  bookmark it :)';
  _message = '';

  addHandlerrender(handler) {
    window.addEventListener('load', handler);
  }

  _generatMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join(' ');
  }
}

export default new BookmarksView();
