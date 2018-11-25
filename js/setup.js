'use strict';


var userDialog = document.querySelector('.setup');
userDialog.classList.remove('hidden');

var similarList = document.querySelector('.setup-similar').classList.remove('hidden');

var similarListElement = document.querySelector('.setup-similar-list');

var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRand = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];

var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];

var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];

var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var makeWizard = function () {
  var wizards = [];
  for (var i = 0; i < 4; i++) {
    var Wizard = {
      name: getRand(WIZARD_FIRST_NAMES) + ' ' + getRand(WIZARD_LAST_NAMES),
      coatColor: getRand(COAT_COLORS),
      eyesColor: getRand(EYES_COLORS)
    };
    wizards.push(Wizard);
  }

  return wizards;

};

// console.log(makeWizard());

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

var createSimilarWizards = function (arr) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderWizard(arr[i]));
  }

  similarListElement.appendChild(fragment);
};

var similarWizards = function () {
  var wizardsArr = makeWizard();
  createSimilarWizards(wizardsArr);
};

similarWizards();
