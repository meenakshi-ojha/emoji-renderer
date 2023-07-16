import React from "react";

function EmojiTable({ emojis }) {
  return (
    <div className="emoji-table-container">
      {emojis?.props?.children ? (
        emojis?.props?.children
      ) : (
        <table className="emoji-table">
          <thead>
            <tr>
              <th>Emoji</th>
              <th>Name</th>
              <th>Category</th>
              <th>Group</th>
            </tr>
          </thead>
          <tbody>
            {emojis.map((emoji) => (
              <tr key={emoji.name}>
                <td>
                  <React.Fragment>
                    <span
                      dangerouslySetInnerHTML={{
                        __html:
                          emoji.htmlCode.length > 1
                            ? `${emoji.htmlCode[0]}${emoji.htmlCode[1]}`
                            : emoji.htmlCode[0],
                      }}
                    />
                  </React.Fragment>
                </td>
                <td>{emoji.name}</td>
                <td>{emoji.category}</td>
                <td>{emoji.group}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default EmojiTable;
