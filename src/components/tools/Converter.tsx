import { getCyrillicText } from "../utils/latinToCyrillic";
import CurrentYear from "./CurrentYear";
import Button from "./Buttons";
import { useTextStorage } from "../tools/Storage";
import "../css/Converter.css";

const Converter = () => {
  const { text, setText, undo, redo, clear } = useTextStorage("");
  const result = getCyrillicText(text);

  return (
    <div>
      <header>
        <h1>Latin to Uzbek Cyrillic converter v2.0 😋&#127829;</h1>
      </header>

      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h2 className="input-title">Lotincha | Latin</h2>
            <Button onUndo={undo} onRedo={redo} onClear={clear} />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={15}
              autoFocus
            />
          </div>

          <div className="col-md-6">
            <h2 className="input-title">Kirillcha | Cyrillic</h2>
            <Button
              onCopy={() =>
                navigator.clipboard.writeText(result).catch(console.error)
              }
            />
            <textarea value={result} readOnly rows={15} />
          </div>
        </div>
        <h4>
          Hints: w=ь | ww=щ, WW=Щ | qw=ы, QW=Ы | Ts=Ц, ts=ц | Yo=Ё, yo=ё <br />
          <br />
          Shortcuts: Ctrl+C=Copy | Ctrl+X=Clear | Ctrl+Z=Undo |
          Ctrl+Shift+Z=Redo
        </h4>
      </div>

      <footer>
        <h3>
          &copy; 2019-
          <CurrentYear /> <a href="https://jasurlive.uz">jasurlive</a> | All
          rights reserved.
        </h3>
      </footer>
    </div>
  );
};

export default Converter;
