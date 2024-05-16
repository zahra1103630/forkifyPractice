import * as model from './model.js';
import paginationView from './paginationView.js';
import recipeSearchView from './recipeSearchView.js';
import recipeView from './recipeView.js';
import resultView from './resultView.js';
import 'regenerator-runtime/runtime';
import 'core-js/stable';
import bookmarksView from './bookmarksView.js';
import addRecipeView from './addRecipeView.js';
import { MODEL_CLOSE_SEC } from './config.js';
import icon from 'url:../img/icons.svg';
import { async } from 'regenerator-runtime';
if (module.hot) {
  module.hot.accept();
}
const recipeContainer = document.querySelector('.recipe');

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controllRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    recipeView.renderSpinner();
    //update result viwe to mark select search result
    resultView.update(model.getSearchResult());

    bookmarksView.update(model.state.bookmarks);
    // 1. loading recipe
    await model.loadRecipe(id);

    //update bookmarks view

    //render recipe
    recipeView.render(model.state.recipe);

    const { recipe } = model.state;
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controllSearchRecipe = async function () {
  try {
    //1) get query
    const query = recipeSearchView.getQuery();
    if (!query) return;

    //2) load search result
    resultView.renderSpinner();
    await model.loadSearchResult(query);

    //3) render search result
    resultView.render(model.getSearchResult());

    //4) render init pagination buttom
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};
const controllPagination = function (goToPage = 1) {
  //1) render New search result
  resultView.render(model.getSearchResult(goToPage));

  //2) render New pagination buttom
  paginationView.render(model.state.search);
};

const controllServing = function (newServing) {
  //1)update the recipe serving (in state)
  model.updateServing(newServing);
  //2)update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};
controllSearchRecipe();

const controllAddBookMark = function () {
  // Add and Delet Bookmars
  if (!model.state.recipe.bookmarked) model.addBookMark(model.state.recipe);
  else model.deletBookMark(model.state.recipe.id);
  // Update recipe view
  recipeView.update(model.state.recipe);
  // Render bookmars
  bookmarksView.render(model.state.bookmarks);
};

const controllBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};
const controllAddRecipe = async function (newRecipe) {
  try {
    //Show load recipe spinner
    addRecipeView.renderSpinner();
    //Upload new Recipe
    await model.uploadNewRecipe(newRecipe);

    //Render the recipe
    recipeView.render(model.state.recipe);
    // Sucsses message
    addRecipeView.renderMessage();
    //render bookmark view
    bookmarksView.render(model.state.bookmarks);
    //Change the url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);
    //Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
    console.log(model.state.recipe);
  } catch (err) {
    console.error('💥💥💥💥', err);
    addRecipeView.renderError(err.message);
  }
};

const init = function () {
  addRecipeView.addHanlerUpload(controllAddRecipe);
  bookmarksView.addHandlerrender(controllBookmarks);
  recipeView.addHandlerRender(controllRecipe);
  recipeView.addHandlerUpdateServing(controllServing);
  recipeView.addHandlerAddBookMark(controllAddBookMark);
  recipeSearchView.addHandlerSearch(controllSearchRecipe);
  paginationView.addHandlerClick(controllPagination);
};
init();
