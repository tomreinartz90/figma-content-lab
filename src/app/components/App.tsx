import React from 'react';
import logo from '../assets/logo.svg';
import 'figma-kit/styles.css'
import '../styles/ui.css';
import {Tabs, Text} from "figma-kit"
import DataSets from "./DataSets";
import Icons from "./Icons/Icons";
function App() {
  const textbox = React.useRef<HTMLInputElement>(undefined);

  const countRef = React.useCallback((element: HTMLInputElement) => {
    if (element) element.value = '5';
    textbox.current = element;
  }, []);

  const onCreate = () => {
    const count = parseInt(textbox.current.value, 10);
    parent.postMessage({ pluginMessage: { type: 'create-rectangles', count } }, '*');
  };

  const onCancel = () => {
    parent.postMessage({ pluginMessage: { type: 'cancel' } }, '*');
  };

  React.useEffect(() => {
    // This is how we read messages sent from the plugin controller
    window.onmessage = (event) => {
      const { type, message } = event.data.pluginMessage;
      if (type === 'create-rectangles') {
        console.log(`Figma Says: ${message}`);
      }
    };
  }, []);

  return (
      <Tabs.Root defaultValue="datasets">
          <Tabs.List>
              <Tabs.Trigger value="datasets">Data sets</Tabs.Trigger>
              <Tabs.Trigger value="icons">Icons</Tabs.Trigger>
          </Tabs.List>
          <Tabs.Content style={{padding: '20px'}} value="datasets">
              <DataSets></DataSets>
          </Tabs.Content>
          <Tabs.Content style={{padding: '20px'}} value="icons">
              <Icons></Icons>
          </Tabs.Content>
      </Tabs.Root>

  );
}

export default App;
