import {Form} from "react-bootstrap";
import {useEffect, useState} from "react";

function TutorialRelationCheckUpdate(props)
{
    const [isChecked,setIsChecked] = useState(false);

    function checkHandler(e)
    {
        setIsChecked(!isChecked)
        props.checkedRelationsHandler(e.target.id, e.target.checked)
    }

    function isIn(elem)
    {
        let res = false;
        props.checkedRelations.forEach((e)=>{
            if(elem === e.exerciseTag)
            {
                res = true;
            }
        })
        return res;
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

    useEffect(()=>{
        let temp = isIn(props.id);
        setIsChecked(temp);
        props.checkedRelationsHandler(props.id, temp);
    },[])

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

export default TutorialRelationCheckUpdate;