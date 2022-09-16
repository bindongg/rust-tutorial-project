import {Form} from "react-bootstrap";
import {useEffect, useState} from "react";

function TutorialRelationCheck(props)
{
    const [isChecked,setIsChecked] = useState(false);

    function checkHandler(e)
    {
        setIsChecked(!isChecked)
        props.checkedRelationsHandler(e.target.id, e.target.checked)
    }

    useEffect(()=>{
        if(props.checkAll === true)
        {
            setIsChecked(true);
            props.checkedRelationsHandler(props.id, true)
        }
        else
        {
            setIsChecked(false);
            props.checkedRelationsHandler(props.id, false)
        }
    },[props.checkAll])

    return(
        <Form.Check
            inline
            label={props.id}
            type={'checkbox'}
            checked={isChecked}
            onChange={(e)=>checkHandler(e)}
            id={props.id}
        />
    );
}

export default TutorialRelationCheck;