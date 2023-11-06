
import '../styles/Popup.css';

function Popup(props) {
    return (
        <div className="popup-panel" onClick={() => props.hidePopup()}>
            <div className="popup">
                <a href={props.magnetLink} target="_blank">
                    <i class="fa fa-download"></i>
                </a>
            </div>
        </div>
    )
}

export default Popup;