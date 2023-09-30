import { ListRow } from "../index";
import { ActionButton } from "../index";
import "./ListContainer.sass";

export const ListContainer = ({
  itemsList,
  primaryAction,
  secondaryAction,
}) => {
  return (
    <div className="list-container">
      <div>
        {itemsList &&
          itemsList.map((item, index) => (
            <ListRow key={index}>{item.title}</ListRow>
          ))}
      </div>
      <div>
        <ActionButton actionHandler={primaryAction.handler}>
          {primaryAction.name}
        </ActionButton>
        {secondaryAction ? (
          <ActionButton actionHandler={secondaryAction.handler}>
            {secondaryAction.name}
          </ActionButton>
        ) : null}
      </div>
    </div>
  );
};
