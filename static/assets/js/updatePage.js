/* global Hashids ClipboardJS cellDescriptions */
const hashids = new Hashids('dauntlessBuilds');

const clipboard = new ClipboardJS('.btn-clipboard'); // eslint-disable-line

function hideAllWeaponsInDropdown() {
  $('#Hammers').css('display', 'none');
  $('#Axes').css('display', 'none');
  $('#Swords').css('display', 'none');
  $('#ChainBlades').css('display', 'none');
  $('#WarPikes').css('display', 'none');
}

function hideAllCellsInAllDropdowns() {
  $('[data-category]').css('display', 'none');
}

function hideAllCellsInDropdown(id) {
  $(`${id} option`).css('display', 'none');
}

function selectFirstVisibleOptionInDropdown(cellSlot) {
  $(`${cellSlot} option`).each(function displayFirstVisible() {
    if ($(this).css('display') !== 'none') {
      $(this).prop('selected', true);
      return false;
    }
    return true;
  });
}

function updateWeaponCells(type) {
  hideAllCellsInDropdown('#weaponCellSelection01');
  $('#weaponCellSelection01 option').each(function displayMatchingCells() {
    if ($(`${type} option:selected`).data('cellslot01') === $(this).data('category')) {
      $(this).css('display', 'block');
    }
  });

  hideAllCellsInDropdown('#weaponCellSelection02');
  $('#weaponCellSelection02 option').each(function displayMatchingCells() {
    if ($(`${type} option:selected`).data('cellslot02') === $(this).data('category')) {
      $(this).css('display', 'block');
    }
  });

  selectFirstVisibleOptionInDropdown('#weaponCellSelection01');
  selectFirstVisibleOptionInDropdown('#weaponCellSelection02');
}

function updateLanternCells() {
  hideAllCellsInDropdown('#lanternCellSelection');
  $('#lanternCellSelection option').each(function displayMatchingCells() {
    if ($('#lanternSelection option:selected').data('cellslot') === $(this).data('category')) {
      $(this).css('display', 'block');
    }
  });

  selectFirstVisibleOptionInDropdown('#lanternCellSelection');
}

function updateCellsInDropdown(armortype) {
  hideAllCellsInDropdown(`#${armortype}CellSelection`);

  $(`#${armortype}CellSelection option`).each(function displayMatchingCells() {
    if ($(`#${armortype}Selection option:selected`).data('cellslot') === $(this).data('category')) {
      $(this).css('display', 'block');
    }
  });

  selectFirstVisibleOptionInDropdown(`#${armortype}CellSelection`);
}

function updateWeaponStats(type) {
  $(`${type} option:selected`).each(function showWeaponStats() {
    $('#weaponIcon').empty();
    if ($(this).data('img')) {
      const imageString = $(this).data('img');
      if (imageString !== undefined && imageString !== 'None') {
        $('#weaponIcon').append(`<img src="/static/assets/images/icons/${imageString}" alt="weapon" height="64" width="64">`);
      }
    }

    let bonusString = $(this).data('bonuses');
    if (bonusString !== undefined && bonusString !== 'None') {
      bonusString = bonusString.replace(/'/g, '"');
      const bonuses = JSON.parse(bonusString);

      Object.keys(bonuses).forEach((key) => {
        $('#weaponBonuses').append(`<button type="button" class="btn btn-primary btn-sm btn-block">${key} +${bonuses[key]}</button>`);
      });
    } else {
      $('#weaponBonuses').append('<p class="text-muted">No bonuses</p>');
    }

    let specialsString = $(this).data('specials');
    if (specialsString !== undefined && specialsString !== 'None') {
      specialsString = specialsString.replace(/'/g, '"');
      const specials = JSON.parse(specialsString);
      Object.keys(specials).forEach((key) => {
        $('#weaponSpecials').append(`<p>${specials[key]}</p>`);
      });
    }

    return true;
  });
}

function updateLanternStats() {
  $('#lanternSelection option:selected').each(function showLanternStats() {
    $('#lanternIcon').empty();
    if ($(this).data('img')) {
      const imageString = $(this).data('img');
      if (imageString !== undefined && imageString !== 'None') {
        $('#lanternIcon').append(`<img src="/static/assets/images/icons/lantern_${imageString}" alt="lantern" height="64" width="64">`);
      }
    }

    let bonusString = $(this).data('bonuses');
    if (bonusString !== undefined && bonusString !== 'None') {
      bonusString = bonusString.replace(/'/g, '"');
      const bonuses = JSON.parse(bonusString);

      Object.keys(bonuses).forEach((key) => {
        $('#lanternBonuses').append(`<button type="button" class="btn btn-primary btn-sm btn-block">${key} +${bonuses[key]}</button>`);
      });
    } else {
      $('#lanternBonuses').append('<p class="text-muted">No bonuses</p>');
    }

    let specialsInstant = $(this).data('instant');
    if (specialsInstant !== undefined) {
      specialsInstant = specialsInstant.replace(/'/g, '"');
      const specials = specialsInstant;
      $('#lanternSpecials').append(`<p>Instant: ${specials}</p>`);
    }

    let specialsHold = $(this).data('hold');
    if (specialsHold !== undefined) {
      specialsHold = specialsHold.replace(/'/g, '"');
      const specials = specialsHold;
      $('#lanternSpecials').append(`<p>Hold: ${specials}</p>`);
    }

    return true;
  });
}

function updateArmorStats(type) {
  $(`#${type}Selection option:selected`).each(function showItemStats() {
    $(`#${type}Icon`).empty();
    if ($(this).data('img')) {
      const imageString = $(this).data('img');
      if (imageString !== undefined && imageString !== 'None') {
        $(`#${type}Icon`).append(`<img src="/static/assets/images/icons/${type}_${imageString}" alt="${type}" height="64" width="64">`);
      }
    }

    if ($(this).data('bonuses')) {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);
        Object.keys(bonuses).forEach((key) => {
          $(`#${type}Bonuses`).append(`<button type="button" class="btn btn-primary btn-sm btn-block">${key} +${bonuses[key]}</button>`);
        });
      } else {
        $(`#${type}Bonuses`).append('<p class="text-muted">No bonuses</p>');
      }
    }

    if ($(this).data('specials')) {
      let specialsString = $(this).data('specials');
      if (specialsString !== undefined && specialsString !== 'None') {
        specialsString = specialsString.replace(/'/g, '"');
        const specials = JSON.parse(specialsString);
        Object.keys(specials).forEach((key) => {
          $(`#${type}Specials`).append(`<p>${specials[key]}</p>`);
        });
      }
    }

    return true;
  });
}

function updateTotalBonuses() {
  const stats = [];
  const uniqueEffects = [];

  if ($('#typeSelection option:selected').val() === '1') {
    $('#Hammers option:selected').each(function addBonusesAndSpecials() {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);

        Object.keys(bonuses).forEach((key) => {
          if (key in stats) {
            stats[key] += bonuses[key];
          } else {
            stats[key] = bonuses[key];
          }
        });
      }

      let specialsString = $(this).data('specials');
      if (specialsString !== undefined && specialsString !== 'None') {
        specialsString = specialsString.replace(/'/g, '"');
        const specials = JSON.parse(specialsString);

        Object.keys(specials).forEach((key) => {
          uniqueEffects.push(specials[key]);
        });
      }
      return true;
    });
  }

  if ($('#typeSelection option:selected').val() === '2') {
    $('#Axes option:selected').each(function addBonusesAndSpecials() {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);

        Object.keys(bonuses).forEach((key) => {
          if (key in stats) {
            stats[key] += bonuses[key];
          } else {
            stats[key] = bonuses[key];
          }
        });
      }

      let specialsString = $(this).data('specials');
      if (specialsString !== undefined && specialsString !== 'None') {
        specialsString = specialsString.replace(/'/g, '"');
        const specials = JSON.parse(specialsString);

        Object.keys(specials).forEach((key) => {
          uniqueEffects.push(specials[key]);
        });
      }

      return true;
    });
  }

  if ($('#typeSelection option:selected').val() === '3') {
    $('#Swords option:selected').each(function addBonusesAndSpecials() {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);

        Object.keys(bonuses).forEach((key) => {
          if (key in stats) {
            stats[key] += bonuses[key];
          } else {
            stats[key] = bonuses[key];
          }
        });
      }

      let specialsString = $(this).data('specials');
      if (specialsString !== undefined && specialsString !== 'None') {
        specialsString = specialsString.replace(/'/g, '"');
        const specials = JSON.parse(specialsString);

        Object.keys(specials).forEach((key) => {
          uniqueEffects.push(specials[key]);
        });
      }

      return true;
    });
  }

  if ($('#typeSelection option:selected').val() === '4') {
    $('#ChainBlades option:selected').each(function addBonusesAndSpecials() {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);

        Object.keys(bonuses).forEach((key) => {
          if (key in stats) {
            stats[key] += bonuses[key];
          } else {
            stats[key] = bonuses[key];
          }
        });
      }

      let specialsString = $(this).data('specials');
      if (specialsString !== undefined && specialsString !== 'None') {
        specialsString = specialsString.replace(/'/g, '"');
        const specials = JSON.parse(specialsString);
        Object.keys(specials).forEach((key) => {
          uniqueEffects.push(specials[key]);
        });
      }

      return true;
    });
  }

  if ($('#typeSelection option:selected').val() === '5') {
    $('#WarPikes option:selected').each(function addBonusesAndSpecials() {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);

        Object.keys(bonuses).forEach((key) => {
          if (key in stats) {
            stats[key] += bonuses[key];
          } else {
            stats[key] = bonuses[key];
          }
        });
      }

      let specialsString = $(this).data('specials');
      if (specialsString !== undefined && specialsString !== 'None') {
        specialsString = specialsString.replace(/'/g, '"');
        const specials = JSON.parse(specialsString);

        Object.keys(specials).forEach((key) => {
          uniqueEffects.push(specials[key]);
        });
      }

      return true;
    });
  }

  $('#lanternSelection option:selected').each(function addBonusesAndSpecials() {
    if ($(this).data('bonuses')) {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);

        Object.keys(bonuses).forEach((key) => {
          if (key in stats) {
            stats[key] += bonuses[key];
          } else {
            stats[key] = bonuses[key];
          }
        });
      }
    }
    return true;
  });

  $('#helmetSelection option:selected').each(function addBonusesAndSpecials() {
    if ($(this).data('bonuses')) {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);

        Object.keys(bonuses).forEach((key) => {
          if (key in stats) {
            stats[key] += bonuses[key];
          } else {
            stats[key] = bonuses[key];
          }
        });
      }
    }

    if ($(this).data('specials')) {
      let specialsString = $(this).data('specials');
      if (specialsString !== undefined && specialsString !== 'None') {
        specialsString = specialsString.replace(/'/g, '"');
        const specials = JSON.parse(specialsString);
        Object.keys(specials).forEach((key) => {
          uniqueEffects.push(specials[key]);
        });
      }
    }

    return true;
  });

  $('#chestplateSelection option:selected').each(function addBonusesAndSpecials() {
    if ($(this).data('bonuses')) {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);

        Object.keys(bonuses).forEach((key) => {
          if (key in stats) {
            stats[key] += bonuses[key];
          } else {
            stats[key] = bonuses[key];
          }
        });
      }
    }

    if ($(this).data('specials')) {
      let specialsString = $(this).data('specials');
      if (specialsString !== undefined && specialsString !== 'None') {
        specialsString = specialsString.replace(/'/g, '"');
        const specials = JSON.parse(specialsString);
        Object.keys(specials).forEach((key) => {
          uniqueEffects.push(specials[key]);
        });
      }
    }
    return true;
  });

  $('#gauntletsSelection option:selected').each(function addBonusesAndSpecials() {
    if ($(this).data('bonuses')) {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);

        Object.keys(bonuses).forEach((key) => {
          if (key in stats) {
            stats[key] += bonuses[key];
          } else {
            stats[key] = bonuses[key];
          }
        });
      }
    }
    if ($(this).data('specials')) {
      let specialsString = $(this).data('specials');
      if (specialsString !== undefined && specialsString !== 'None') {
        specialsString = specialsString.replace(/'/g, '"');
        const specials = JSON.parse(specialsString);

        Object.keys(specials).forEach((key) => {
          uniqueEffects.push(specials[key]);
        });
      }
    }

    return true;
  });

  $('#greavesSelection option:selected').each(function addBonusesAndSpecials() {
    if ($(this).data('bonuses')) {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);

        Object.keys(bonuses).forEach((key) => {
          if (key in stats) {
            stats[key] += bonuses[key];
          } else {
            stats[key] = bonuses[key];
          }
        });
      }
    }

    if ($(this).data('specials')) {
      let specialsString = $(this).data('specials');
      if (specialsString !== undefined && specialsString !== 'None') {
        specialsString = specialsString.replace(/'/g, '"');
        const specials = JSON.parse(specialsString);

        Object.keys(specials).forEach((key) => {
          uniqueEffects.push(specials[key]);
        });
      }
    }

    return true;
  });

  $('#weaponCellSelection01 option:selected').each(function addCellBonuses() {
    if ($(this).data('bonuses')) {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);

        Object.keys(bonuses).forEach((key) => {
          if (key in stats) {
            stats[key] += bonuses[key];
          } else {
            stats[key] = bonuses[key];
          }
        });
      }
    }
    return true;
  });

  $('#weaponCellSelection02 option:selected').each(function addCellBonuses() {
    if ($(this).data('bonuses')) {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);

        Object.keys(bonuses).forEach((key) => {
          if (key in stats) {
            stats[key] += bonuses[key];
          } else {
            stats[key] = bonuses[key];
          }
        });
      }
    }
    return true;
  });

  $('#lanternCellSelection option:selected').each(function addCellBonuses() {
    if ($(this).data('bonuses')) {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);
        Object.keys(bonuses).forEach((key) => {
          if (key in stats) {
            stats[key] += bonuses[key];
          } else {
            stats[key] = bonuses[key];
          }
        });
      }
    }
    return true;
  });

  $('#helmetCellSelection option:selected').each(function addCellBonuses() {
    if ($(this).data('bonuses')) {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);
        Object.keys(bonuses).forEach((key) => {
          if (key in stats) {
            stats[key] += bonuses[key];
          } else {
            stats[key] = bonuses[key];
          }
        });
      }
    }
    return true;
  });

  $('#chestplateCellSelection option:selected').each(function addCellBonuses() {
    if ($(this).data('bonuses')) {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);

        Object.keys(bonuses).forEach((key) => {
          if (key in stats) {
            stats[key] += bonuses[key];
          } else {
            stats[key] = bonuses[key];
          }
        });
      }
    }
    return true;
  });

  $('#gauntletsCellSelection option:selected').each(function addCellBonuses() {
    if ($(this).data('bonuses')) {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);
        Object.keys(bonuses).forEach((key) => {
          if (key in stats) {
            stats[key] += bonuses[key];
          } else {
            stats[key] = bonuses[key];
          }
        });
      }
    }
    return true;
  });

  $('#greavesCellSelection option:selected').each(function addCellBonuses() {
    if ($(this).data('bonuses')) {
      let bonusString = $(this).data('bonuses');
      if (bonusString !== undefined && bonusString !== 'None') {
        bonusString = bonusString.replace(/'/g, '"');
        const bonuses = JSON.parse(bonusString);
        Object.keys(bonuses).forEach((key) => {
          if (key in stats) {
            stats[key] += bonuses[key];
          } else {
            stats[key] = bonuses[key];
          }
        });
      }
    }
    return true;
  });

  $('#stats').empty();

  const sortedStats = [];

  if (Object.keys(stats).length > 0) {
    const bonusValues = Object.values(stats);
    const maxBonus = Math.max(...bonusValues);

    const alphKeys = Object.keys(stats).sort();

    for (let i = maxBonus; i > 0; i -= 1) {
      alphKeys.forEach((key) => {
        if (parseInt(stats[key], 10) === i) {
          sortedStats[`${key}`] = stats[key];
        }
      });
    }

    Object.keys(sortedStats).forEach((key) => {
      let tooltip = '';
      Object.keys(cellDescriptions).forEach((secondaryKey) => {
        const object = cellDescriptions[secondaryKey];
        if (object.name === key) {
          for (let i = 0; i < 6; i += 1) {
            const cellName = Object.keys(object)[i + 1];
            if (i < sortedStats[key]) {
              tooltip += `<p><b>${object[cellName]}</b></p>`;
            } else {
              tooltip += `<p class='text-secondary'>${object[cellName]}</p>`;
            }
          }
        }
      });
      $('#stats').append(`<button type="button" class="btn btn-primary btn-sm btn-block" data-toggle="tooltip" data-placement="bottom" data-html="true" title="${tooltip}">${key} +${sortedStats[key]}</button>`);
    });
  } else {
    $('#stats').append('<ul><p class="card-subtitle text-muted"><svg-icon>No bonuses from items or infusions.</p></ul>');
  }

  $('#lanternEffects').empty();

  const lanternEffectInstant = `Instant: ${$('#lanternSelection option:selected').data('instant')}`;
  const lanternEffectHold = `Hold: ${$('#lanternSelection option:selected').data('hold')}`;

  $('#lanternEffects').append(`<li>${lanternEffectInstant}</li>`);
  $('#lanternEffects').append(`<li>${lanternEffectHold}</li>`);

  $('#uniqueEffects').empty();
  if (uniqueEffects.length > 0) {
    for (let i = 0; i < uniqueEffects.length; i += 1) {
      $('#uniqueEffects').append(`<li>${uniqueEffects[i]}</li>`);
    }
  } else {
    $('#uniqueEffects').append('<p class="card-subtitle text-muted">No unique effects from items.</p>');
  }

  $('#weaponBonuses').empty();
  $('#weaponSpecials').empty();

  if ($('#typeSelection option:selected').val() === '1') {
    updateWeaponStats('#Hammers');
  }
  if ($('#typeSelection option:selected').val() === '2') {
    updateWeaponStats('#Axes');
  }
  if ($('#typeSelection option:selected').val() === '3') {
    updateWeaponStats('#Swords');
  }
  if ($('#typeSelection option:selected').val() === '4') {
    updateWeaponStats('#ChainBlades');
  }
  if ($('#typeSelection option:selected').val() === '5') {
    updateWeaponStats('#WarPikes');
  }

  $('#lanternBonuses').empty();
  $('#lanternSpecials').empty();
  updateLanternStats();

  $('#helmetBonuses').empty();
  $('#helmetSpecials').empty();
  updateArmorStats('helmet');

  $('#chestplateBonuses').empty();
  $('#chestplateSpecials').empty();
  updateArmorStats('chestplate');

  $('#gauntletsBonuses').empty();
  $('#gauntletsSpecials').empty();
  updateArmorStats('gauntlets');

  $('#greavesBonuses').empty();
  $('#greavesSpecials').empty();
  updateArmorStats('greaves');

  $(() => {
    $('[data-toggle="tooltip"]').tooltip();
  });
}


function showSelectedWeapons(type) {
  hideAllWeaponsInDropdown();
  $(type).css('display', 'block');
}

function updateUrl() {
  const selectedWeaponType = $('#typeSelection option:selected').val();

  let selectedWeapon = 0;

  let selectedWeaponCell01 = 0;
  let selectedWeaponCell01level = 0;

  let selectedWeaponCell02 = 0;
  let selectedWeaponCell02level = 0;

  if ($('#typeSelection option:selected').val() === '1') {
    selectedWeapon = $('#Hammers option:selected').val();

    selectedWeaponCell01 = $('#weaponCellSelection01 option:selected').val();
    selectedWeaponCell01level = $('#weaponCellSelection01 option:selected').data('amount');

    selectedWeaponCell02 = $('#weaponCellSelection02 option:selected').val();
    selectedWeaponCell02level = $('#weaponCellSelection02 option:selected').data('amount');
  } else if ($('#typeSelection option:selected').val() === '2') {
    selectedWeapon = $('#Axes option:selected').val();

    selectedWeaponCell01 = $('#weaponCellSelection01 option:selected').val();
    selectedWeaponCell01level = $('#weaponCellSelection01 option:selected').data('amount');

    selectedWeaponCell02 = $('#weaponCellSelection02 option:selected').val();
    selectedWeaponCell02level = $('#weaponCellSelection02 option:selected').data('amount');
  } else if ($('#typeSelection option:selected').val() === '3') {
    selectedWeapon = $('#Swords option:selected').val();

    selectedWeaponCell01 = $('#weaponCellSelection01 option:selected').val();
    selectedWeaponCell01level = $('#weaponCellSelection01 option:selected').data('amount');

    selectedWeaponCell02 = $('#weaponCellSelection02 option:selected').val();
    selectedWeaponCell02level = $('#weaponCellSelection02 option:selected').data('amount');
  } else if ($('#typeSelection option:selected').val() === '4') {
    selectedWeapon = $('#ChainBlades option:selected').val();

    selectedWeaponCell01 = $('#weaponCellSelection01 option:selected').val();
    selectedWeaponCell01level = $('#weaponCellSelection01 option:selected').data('amount');

    selectedWeaponCell02 = $('#weaponCellSelection02 option:selected').val();
    selectedWeaponCell02level = $('#weaponCellSelection02 option:selected').data('amount');
  } else {
    selectedWeapon = $('#WarPikes option:selected').val();

    selectedWeaponCell01 = $('#weaponCellSelection01 option:selected').val();
    selectedWeaponCell01level = $('#weaponCellSelection01 option:selected').data('amount');

    selectedWeaponCell02 = $('#weaponCellSelection02 option:selected').val();
    selectedWeaponCell02level = $('#weaponCellSelection02 option:selected').data('amount');
  }

  const selectedLantern = $('#lanternSelection option:selected').val();

  let selectedLanternCell = 0;
  let selectedLanternCellLevel = 0;

  selectedLanternCell = $('#lanternCellSelection option:selected').val();
  selectedLanternCellLevel = $('#lanternCellSelection option:selected').data('amount');


  const selectedHelmet = $('#helmetSelection option:selected').val();

  let selectedHelmetCell = 0;
  let selectedHelmetCellLevel = 0;

  selectedHelmetCell = $('#helmetCellSelection option:selected').val();
  selectedHelmetCellLevel = $('#helmetCellSelection option:selected').data('amount');

  const selectedChestplate = $('#chestplateSelection option:selected').val();

  let selectedChestplateCell = 0;
  let selectedChestplateCellLevel = 0;

  selectedChestplateCell = $('#chestplateCellSelection option:selected').val();
  selectedChestplateCellLevel = $('#chestplateCellSelection option:selected').data('amount');


  const selectedGauntlets = $('#gauntletsSelection option:selected').val();

  let selectedGauntletsCell = 0;
  let selectedGauntletsCellLevel = 0;

  selectedGauntletsCell = $('#gauntletsCellSelection option:selected').val();
  selectedGauntletsCellLevel = $('#gauntletsCellSelection option:selected').data('amount');

  const selectedGreaves = $('#greavesSelection option:selected').val();

  let selectedGreavesCell = 0;
  let selectedGreavesCellLevel = 0;

  selectedGreavesCell = $('#greavesCellSelection option:selected').val();
  selectedGreavesCellLevel = $('#greavesCellSelection option:selected').data('amount');

  const hash = hashids.encode(
    selectedWeaponType, selectedWeapon, selectedWeaponCell01, selectedWeaponCell01level,
    selectedWeaponCell02, selectedWeaponCell02level, selectedLantern, selectedLanternCell,
    selectedLanternCellLevel, selectedHelmet, selectedHelmetCell, selectedHelmetCellLevel,
    selectedChestplate, selectedChestplateCell, selectedChestplateCellLevel, selectedGauntlets,
    selectedGauntletsCell, selectedGauntletsCellLevel, selectedGreaves, selectedGreavesCell,
    selectedGreavesCellLevel,
  );

  $('#permaLink').val(`http://dauntlessbuilds.com/b/${hash}`);
}

$('#typeSelection').change(() => {
  if ($('#typeSelection option:selected').val() === '1') {
    updateWeaponCells('#Hammers');
    showSelectedWeapons('#Hammers');
  } else if ($('#typeSelection option:selected').val() === '2') {
    updateWeaponCells('#Axes');
    showSelectedWeapons('#Axes');
  } else if ($('#typeSelection option:selected').val() === '3') {
    updateWeaponCells('#Swords');
    showSelectedWeapons('#Swords');
  } else if ($('#typeSelection option:selected').val() === '4') {
    updateWeaponCells('#ChainBlades');
    showSelectedWeapons('#ChainBlades');
  } else {
    updateWeaponCells('#WarPikes');
    showSelectedWeapons('#WarPikes');
  }
  updateUrl();
  updateTotalBonuses();
});


$('#Hammers').change(() => {
  updateWeaponCells('#Hammers');
  updateUrl();
  updateTotalBonuses();
});

$('#Axes').change(() => {
  updateWeaponCells('#Axes');
  updateUrl();
  updateTotalBonuses();
});

$('#Swords').change(() => {
  updateWeaponCells('#Swords');
  updateUrl();
  updateTotalBonuses();
});

$('#ChainBlades').change(() => {
  updateWeaponCells('#ChainBlades');
  updateUrl();
  updateTotalBonuses();
});

$('#WarPikes').change(() => {
  updateWeaponCells('#WarPikes');
  updateUrl();
  updateTotalBonuses();
});


$('#lanternSelection').change(() => {
  updateLanternCells();
  updateUrl();
  updateTotalBonuses();
});


$('#helmetSelection').change(() => {
  updateCellsInDropdown('helmet');
  updateUrl();
  updateTotalBonuses();
});

$('#chestplateSelection').change(() => {
  updateCellsInDropdown('chestplate');
  updateUrl();
  updateTotalBonuses();
});

$('#gauntletsSelection').change(() => {
  updateCellsInDropdown('gauntlets');
  updateUrl();
  updateTotalBonuses();
});

$('#greavesSelection').change(() => {
  updateCellsInDropdown('greaves');
  updateUrl();
  updateTotalBonuses();
});


$('#weaponCellSelection01').change(() => {
  updateUrl();
  updateTotalBonuses();
});

$('#weaponCellSelection02').change(() => {
  updateUrl();
  updateTotalBonuses();
});

$('#lanternCellSelection').change(() => {
  updateUrl();
  updateTotalBonuses();
});

$('#helmetCellSelection').change(() => {
  updateUrl();
  updateTotalBonuses();
});

$('#chestplateCellSelection').change(() => {
  updateUrl();
  updateTotalBonuses();
});

$('#gauntletsCellSelection').change(() => {
  updateUrl();
  updateTotalBonuses();
});

$('#greavesCellSelection').change(() => {
  updateUrl();
  updateTotalBonuses();
});

$(document).ready(() => {
  $('#wrongCodeWarning').css('display', 'none');

  hideAllCellsInAllDropdowns();

  /* global decodeUrl:true/false buildString:hash */

  if (decodeUrl === true) {
    const selectedItems = hashids.decode(buildString);

    if (selectedItems.length > 0) {
      // 0 selectedWeaponType
      // 1 selectedWeapon
      // 2 selectedWeaponCell01
      // 3 selectedWeaponCell01level
      // 4 selectedWeaponCell02
      // 5 selectedWeaponCell02level
      // 6 selectedLantern
      // 7 selectedLanternCell
      // 8 selectedLanternCellLevel
      // 9 selectedHelmet
      // 10 selectedHelmetCell
      // 11 selectedHelmetCellLevel
      // 12 selectedChestplate
      // 13 selectedChestplateCell
      // 14 selectedChestplateCellLevel
      // 15 selectedGauntlets
      // 16 selectedGauntletsCell
      // 17 selectedGauntletsCellLeve
      // 18 selectedGreaves
      // 19 selectedGreavesCell
      // 20 selectedGreavesCellLevel

      $('#typeSelection').val(selectedItems[0]);

      if (selectedItems[0] === 1) {
        showSelectedWeapons('#Hammers');
        $('#Hammers').val(selectedItems[1]);
        updateWeaponCells('#Hammers');
      } else if (selectedItems[0] === 2) {
        showSelectedWeapons('#Axes');
        $('#Axes').val(selectedItems[1]);
        updateWeaponCells('#Axes');
      } else if (selectedItems[0] === 3) {
        showSelectedWeapons('#Swords');
        $('#Swords').val(selectedItems[1]);
        updateWeaponCells('#Swords');
      } else if (selectedItems[0] === 4) {
        showSelectedWeapons('#ChainBlades');
        $('#ChainBlades').val(selectedItems[1]);
        updateWeaponCells('#ChainBlades');
      } else {
        showSelectedWeapons('#WarPikes');
        $('#WarPikes').val(selectedItems[1]);
        updateWeaponCells('#WarPikes');
      }

      $('#lanternSelection').val(selectedItems[6]);

      $('#helmetSelection').val(selectedItems[9]);
      $('#chestplateSelection').val(selectedItems[12]);
      $('#gauntletsSelection').val(selectedItems[15]);
      $('#greavesSelection').val(selectedItems[18]);


      updateLanternCells();

      updateCellsInDropdown('helmet');
      updateCellsInDropdown('chestplate');
      updateCellsInDropdown('gauntlets');
      updateCellsInDropdown('greaves');


      $('#weaponCellSelection01 option').each(function selectCellById() {
        if (parseInt($(this).val(), 10) === selectedItems[2] && $(this).data('amount') === selectedItems[3]) {
          $(this).prop('selected', true);
          return false;
        }
        return true;
      });

      $('#weaponCellSelection02 option').each(function selectCellById() {
        if (parseInt($(this).val(), 10) === selectedItems[4] && $(this).data('amount') === selectedItems[5]) {
          $(this).prop('selected', true);
          return false;
        }
        return true;
      });


      $('#lanternCellSelection option').each(function selectCellById() {
        if (parseInt($(this).val(), 10) === selectedItems[7] && $(this).data('amount') === selectedItems[8]) {
          $(this).prop('selected', true);
          return false;
        }
        return true;
      });


      $('#helmetCellSelection option').each(function selectCellById() {
        if (parseInt($(this).val(), 10) === selectedItems[10] && $(this).data('amount') === selectedItems[11]) {
          $(this).prop('selected', true);
          return false;
        }
        return true;
      });

      $('#chestplateCellSelection option').each(function selectCellById() {
        if (parseInt($(this).val(), 10) === selectedItems[13] && $(this).data('amount') === selectedItems[14]) {
          $(this).prop('selected', true);
          return false;
        }
        return true;
      });

      $('#gauntletsCellSelection option').each(function selectCellById() {
        if (parseInt($(this).val(), 10) === selectedItems[16] && $(this).data('amount') === selectedItems[17]) {
          $(this).prop('selected', true);
          return false;
        }
        return true;
      });

      $('#greavesCellSelection option').each(function selectCellById() {
        if (parseInt($(this).val(), 10) === selectedItems[19] && $(this).data('amount') === selectedItems[20]) {
          $(this).prop('selected', true);
          return false;
        }
        return true;
      });
    } else {
      $('#wrongCodeWarning').css('display', 'block');
      showSelectedWeapons('#Hammers');
    }
  } else {
    showSelectedWeapons('#Hammers');
  }

  updateUrl();
  updateTotalBonuses();
});
