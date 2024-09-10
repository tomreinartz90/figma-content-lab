import {InsertUtil} from "./util/insert.util";

figma.showUI(__html__, { themeColors: true, /* other options */ });

figma.ui.resize(400, 300);

figma.ui.onmessage = (msg) => {
  if (msg.type === 'insert-text') {
    InsertUtil.insertTextInSelection(msg.text)
  }

  if (msg.type === 'insert-texts') {
    InsertUtil.insertTextListInSelection(msg.texts)
  }
};
