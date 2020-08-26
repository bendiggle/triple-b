export const getTotalSelectionsForPlayer = (selections) => {
  let totalSelections = 0;
  selections.forEach(selection => {
    totalSelections += selection.totalSelections;
  });
  return totalSelections;
};

export const getWinPercentageForPlayer = (selections, totalSelections, withPercentSymbol = true) => {
  let winningSelections = 0;
  selections.forEach(selection => {
    winningSelections += selection.winningSelections;
  });
  const percentage = (winningSelections / totalSelections) * 100;
  if (withPercentSymbol) return `${percentage.toFixed(1)}%`;
  return percentage.toFixed(1);
}

export const getTotalLetDowns = (selections) =>
  selections.filter(selection => selection.selectionCostWin).length