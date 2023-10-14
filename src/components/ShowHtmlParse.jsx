import parse from "html-react-parser";

const ShowHtmlParse = ({ htmltext }) => {
  const changeHtmlData = () => {
    return parse(htmltext, {
      replace: (node) => {
        if(node.name === 'table'){
            node.attribs.class += ' table table-responsive table-bordered table-hover table-striped' 
            return node ;
        }
        return node ;
      },
    });
  };

  return <div>{changeHtmlData(htmltext)}</div>;
};

export default ShowHtmlParse;
