import { useParams } from "react-router-dom";
import data from '../Dashboard/mock_data.json';
import {Link} from 'react-router-dom';




export default function CareenPath(props)
{
    console.log("career path", props);
    const { id } = useParams();
    return (
        <div className="container">
            {/**DropDown button for career path , default value = chosen path */}
           <div className="row">
          <div className="col">
          <div class="btn-group">
  <button class="btn btn-secondary btn-lg dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    Large button
  </button>
  <div class="dropdown-menu">
    {data.map((display)=>{
        return  <Link to={`/dashboard/${display.career}`}>
        <li className="dropdown-item">{display.career}</li>
        </Link>
    })}
  </div>
</div>
          </div>
          <div className="col">
            <h1>related school</h1>
          </div>
</div>

        </div>
    )
}