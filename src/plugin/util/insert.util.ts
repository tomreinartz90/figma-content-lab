export class InsertUtil {
    static insertTextInSelection(text:string){
        figma.currentPage.selection.forEach(node => {
            InsertUtil.insertTextIntoNode(node, text);
        })
    }

    static insertTextListInSelection(texts:Array<string>){
        figma.currentPage.selection.forEach((node, index) => {
            InsertUtil.insertTextIntoNode(node, texts[index]);
        })
    }

    private static insertTextIntoNode(node, text){
        if (node.type === 'TEXT') {
            const font = node.fontName;
            figma.loadFontAsync(font).then(() => {
                node.characters = text;
            })
        }
    }
}