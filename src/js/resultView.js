import { View } from './Viwe';
import icon from 'url:../img/icons.svg';
import previewView from './previewView';
class ResultViwe extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'No recipes found for your query! Please try again :)';
  _message = '';

  _generatMarkup() {
    return this._data
      .map(result => previewView.render(result, false))
      .join(' ');
  }
}

export default new ResultViwe();
