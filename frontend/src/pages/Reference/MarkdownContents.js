import React,{useEffect, useState} from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import {dark} from "react-syntax-highlighter/src/styles/hljs";

function MarkdownContents(){
    // const [contents, setContents] = useState([]);
    //
    // useEffect( () => {
    //     const getContents = async () => {
    //         const contents = await axios.get("https://ec33a7bf-9e16-4092-8ca5-aeeaf2a1072c.mock.pstmn.io/reference/2");
    //         setContents(contents.data.data);
    //     }
    //     // 실행함으로써 데이타를 fetching합니다.
    //     getContents();
    // }, []);
    //
    // console.log({contents});

    const markdown = `# 함수에서의 소유권
## 함수 파라미터에서의 참조
#### 중복 사용 가능: &
참조를 사용하면 여러 번 사용할 수 있습니다.
\`\`\`rust
fn print_country(country_name: &String){
\tprintln!("My country is {country_name}");
}
fn main(){
\tlet country = "대한민국".to_string();
\tprint_country(&country); // \`print_greeting\`은 '&'를 통해서 'String'을 대여함
\tprint_country(&country); //\`greeting\`은 \`print_greeting\`로 이동하지 않아 다시 사용가능함
\tprint_country(&country);
}
\`\`\`
출력 결과
\`\`\`text
My country is 대한민국
My country is 대한민국
My country is 대한민국
\`\`\`
대여를 사용하면 전체 소유권을 차지하지 않고 값을 사용할 수 있습니다.
**그러나,** 값을 대여하는 경우 완전히 소유한 값으로 수행할 수 있는 모든 작업이 가능한 것은 아닙니다.
### 변경 가능한 참조: &mut
대여한 값을 변경하려고 하면 어떻게 될까요?
&mut를 사용해서 변경이 가능한 참조를 사용할 수 있습니다.
\`\`\`rust
fn add_is_great(country_name: &mut String){
\tcountry_name.push_str(" is great!");
\tprintln!("Now it says {country_name}");
}
fn main(){
\tlet mut my_country = "캐나다".to_string();
\tadd_is_great(&mut my_country); //변경가능한 참조
\tadd_is_great(&mut my_country); //변경가능한 참조
}
\`\`\`
출력 결과
\`\`\`text
Now it says 캐나다 is great!
Now it says 캐나다 is great! is great!
\`\`\`
‘변경 불가능 대여’:  \`&\` 대여를 사용하면 데이터를 읽을 수만 있고 변경할 수는 없습니다.
‘변경 가능 대여’:  \`&mut\` 대여를 사용하면 데이터를 읽고 쓸 수 있습니다.
# 소유권 심화
### 소유권 심화
헷갈리는 예제를 한번 같이 살펴봅시다.
\`\`\`rust
fn add_is_great(mut country_name: String){ //함수가 유일한 소유권자이므로 mut로 매개변수 입력 가능
\tcountry_name.push_str(" is great");
\tprintln!("Now it says: {country_name}");
}
fn main(){
\tlet my_country = "대한민국".to_string();
\tadd_is_great(my_country); //함수로 소유권 넘어감
}
\`\`\`
출력 결과
\`\`\`text
Now it says: 대한민국 is great
\`\`\`
해당 코드는 에러가 나지 않습니다. 대체 왜 그런 걸까요?
\`main\`함수에서 \`add_is_great\`로 소유권이 넘어갔기 때문입니다.
따라서 해당 함수가 유일한 소유권자이므로 매개변수도 \`mut\`형식으로 변경가능합니다.
`
    return(<ReactMarkdown children={markdown}
                          remarkPlugins={[remarkGfm]}
                          components={{
                              code({node, inline, className, children, ...props}) {
                                  const match = /language-(\w+)/.exec(className || '')
                                  return !inline && match ? (
                                      <SyntaxHighlighter
                                          children={String(children).replace(/\n$/, '')}
                                          style={dark}
                                          language={match[1]}
                                          PreTag="div"
                                          {...props}
                                      />
                                  ) : (
                                      <code className={className} {...props}>
                                          {children}
                                      </code>
                                  )
                              }
                          }}/>);

}

export default MarkdownContents;