import { useState, useEffect, FunctionComponent, ChangeEvent, KeyboardEvent, SyntheticEvent } from 'react';
import styles from './AutoComplete.module.css';
import { replaceAll } from '../utils';

interface Props {
  value: string;
  suggestions?: string[];
  onChange?: (value: string) => void;
}

/**
 * Renders the text Input with autocomplete suggestions in the DropDown List
 * @component AutoComplete
 * @param {string} value - input value as string
 * @param {array} suggestions - list of autocomplete suggestions as strings
 * @param {func} onChange - event callback, called as onChange(value) on every char input
 */
const AutoComplete: FunctionComponent<Props> = ({ value: propValue, suggestions = [], onChange: propOnChange }) => {
  const [value, setValue] = useState(propValue ?? ''); // Current user input
  const [matched, setMatched] = useState<string[]>([]); // Filtered Suggestions according to current input value
  const [showList, setShowList] = useState(false); // The dropdown list with matched Suggestions is opened when true
  const [selectedIndex, setSelectedIndex] = useState(-1); // The index of currently selected Suggestion in the list

  useEffect(() => {
    updateSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Updates matched Suggestions and resets the list selection
  function updateSuggestions(newValue?: string) {
    let newMatched;
    if (!newValue) {
      newMatched = [...suggestions];
    } else {
      const textToFind = newValue.toLowerCase();
      newMatched = suggestions.filter((item) => item.toLowerCase().includes(textToFind));
    }
    setMatched(newMatched);
    setSelectedIndex(-1);
  }

  // Calls onChange() from props, also updates matched Suggestions
  function doChange(newValue: string) {
    propOnChange?.(newValue);
    updateSuggestions(newValue);
  }

  // Called on every Char the User enters
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.currentTarget.value;
    if (newValue !== value) {
      setValue(newValue);
      setShowList(true); // Something new were typed, so show DropDown list again
      doChange(newValue);
    }
  };

  // Tracks Esc, Enter, Tab, Space and Arrow keys
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    let newSelectedIndex = selectedIndex;

    // TODO: Refactor this to using event.key instead of event.keyCode
    /* eslint-disable no-fallthrough */
    switch (event.keyCode) {
      case 27: // Esc pressed
        // Close the DropDown list
        setShowList(false);
        setSelectedIndex(-1);
        return; // Thats all for now

      case 13: // Enter pressed
        if (!showList) {
          // Just open DropDown on first press
          setShowList(true);
          return;
        }
      // Note: No break here!!!

      case 9: // Tab pressed
      case 32: // Space pressed
        if (selectedIndex >= 0 && selectedIndex < matched.length) {
          // Apply currently selected Item, close the DropDown list, stop event propagation, call OnChange event
          event.preventDefault();
          const newValue = matched[selectedIndex];
          setValue(newValue);
          setShowList(false);
          setSelectedIndex(-1);
          doChange(newValue);
        }
        return; // Thats all for now

      case 38: // ArrowUp pressed
        if (!showList) {
          // Just open DropDown on first press
          setShowList(true);
          return;
        }

        // Select Prev item
        newSelectedIndex = Math.max(selectedIndex - 1, 0);
        break;

      case 40: // ArrowDown pressed
        if (!showList) {
          // Just open DropDown on first press
          setShowList(true);
          return;
        }

        // Select Next item
        newSelectedIndex = Math.min(selectedIndex + 1, matched.length - 1);
        break;
    }

    // Set new selectedIndex and make sure the DropDown is shown
    setSelectedIndex(newSelectedIndex);
    setShowList(true);
  };

  // Called when the User clicks some Item in DropDown list
  const onItemClick = (event: SyntheticEvent<HTMLLIElement>) => {
    const newValue = event.currentTarget.innerText;
    if (newValue !== value) {
      // Set new value and hide the DropDown list
      setValue(newValue);
      setShowList(false);
    }
  };

  // Hide the DropDown list when the input field loosing focus
  const onBlur = () => {
    setTimeout(() => {
      setShowList(false);
    }, 250);
  };

  const onClearButtonClick = () => {
    setValue('');
    doChange('');
  };

  // Renders given Text by replacing all subSting occurrences with <span class="highlight">subSting</span>
  function renderHighlightedText(text: string, subSting: string) {
    return replaceAll(text, subSting, `<span class="${styles.highlight}">${subSting.toLocaleUpperCase()}</span>`);
  }

  // Renders a list of currently matched Suggestions
  function renderSuggestions() {
    if (!showList || matched.length < 1) {
      return null; // Nothing to render
    }

    return (
      <ul className={styles.suggestions}>
        {matched.map((item, index) => (
          <li
            key={`item-${item}-${index}`}
            className={index === selectedIndex ? styles.selected : undefined}
            dangerouslySetInnerHTML={{ __html: renderHighlightedText(item, value) }}
            onClick={onItemClick}
          />
        ))}
      </ul>
    );
  }

  return (
    <div className={styles.autocomplete}>
      <div className={styles.inputWithButton}>
        <input
          className={styles.value}
          type="text"
          value={value}
          onChange={onChange}
          onKeyDown={onKeyDown}
          onBlur={onBlur}
        />
        <button className={styles.button} onClick={onClearButtonClick}>
          X
        </button>
      </div>
      {renderSuggestions()}
    </div>
  );
};

export default AutoComplete;
