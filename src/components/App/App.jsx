import { useCallback, useEffect, useState } from "react";
import { ListContainer } from "../index";
import { tasksService } from "../../services/tasksService";
import { ERROR_MESSAGE } from "../../constants/messages";
import "./App.sass";

export const App = () => {
  const [list, setList] = useState([]);
  const [state, updateState] = useState([]);

  useEffect(() => {
    (async () => {
      setList(
        (await tasksService.get().catch(alert))
          .slice(0, 15)
          .map((item, i) => ({ ...item, title: "Task " + ++i }))
      );
    })();
  }, []);

  const moveItemToAnotherContainer = useCallback((startIndex, finalIndex) => {
    updateState((prevState) => {
      const state = [...prevState];
      const element = state[startIndex].items.shift();
      state[finalIndex].items.unshift(element);
      return state;
    });
  }, []);

  const removeItemFromDashboard = useCallback((coloumnIndex) => {
    updateState((prevState) => {
      const currentList = prevState[coloumnIndex].items;
      const removedItem = currentList[currentList.length - 1];

      (async (id) => {
        if (id) {
          return await tasksService.detele(id).then(() => {
            updateState((prevState) => {
              const state = [...prevState];
              state[coloumnIndex].items.pop();
              return state;
            });
          });
        }
      })(removedItem?.id);

      return prevState;
    });
  }, []);

  useEffect(() => {
    if (list.length) {
      updateState([
        {
          items: [...list],
          actions: [
            {
              handler: () => moveItemToAnotherContainer(0, 1),
              name: "Transfer first to right",
            },
          ],
        },
        {
          items: [],
          actions: [
            {
              handler: () => moveItemToAnotherContainer(1, 0),
              name: "Transfer first to left",
            },
            {
              handler: () => moveItemToAnotherContainer(1, 2),
              name: "Transfer first to right",
            },
          ],
        },
        {
          items: [],
          actions: [
            {
              handler: () => removeItemFromDashboard(2),
              name: "Remove last item",
            },
          ],
        },
      ]);
    }
  }, [list]);

  return (
    <div className="application-container">
      {(state &&
        list.length &&
        state.map((coloumn, index) => (
          <ListContainer
            title={coloumn.title}
            key={index}
            itemsList={coloumn.items}
            primaryAction={coloumn.items.length && coloumn.actions[0]}
            secondaryAction={coloumn.items.length && coloumn.actions[1]}
          />
        ))) || <h2>{ERROR_MESSAGE}</h2>}
    </div>
  );
};
