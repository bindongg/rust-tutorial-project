import React from "react";
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

    const markdown = `
##### Rust를 배울 수 있는 여러가지 참고 사이트를 추가로 링크로 올립니다. 
##### 우리가 제공하는 Rust Tutorial을 끝낸 다음,더 공부하고 싶다면 참고하면 좋은 자료들입니다. 



### <영문>

1. Rust Cookbook
[https://rust-lang-nursery.github.io/rust-cookbook/intro.html](https://rust-lang-nursery.github.io/rust-cookbook/intro.html)
2. Rust By Example(학습 페이지)
[https://www.rust-lang.org/learn](https://www.rust-lang.org/learn)
3. tutorialspoint
[https://www.tutorialspoint.com/rust/index.htm](https://www.tutorialspoint.com/rust/index.htm)
4. 영문/document 형식
[https://learning-rust.github.io/docs/a1.why_rust.html](https://learning-rust.github.io/docs/a1.why_rust.html)  
5. Easy Rust
[https://dhghomon.github.io/easy_rust/Chapter_2.html](https://dhghomon.github.io/easy_rust/Chapter_2.html)
6. freeCodeCamp
[https://www.freecodecamp.org/news/rust-in-replit/](https://www.freecodecamp.org/news/rust-in-replit/)
7. educative: ****Learn Rust from Scratch****
[https://www.educative.io/courses/learn-rust-from-scratch?affiliate_id=5073518643380224](https://www.educative.io/courses/learn-rust-from-scratch?affiliate_id=5073518643380224)

### <국문>

1. Learn Rust 번역본
[https://rinthel.github.io/rust-lang-book-ko/foreword.html](https://rinthel.github.io/rust-lang-book-ko/foreword.html)
2. Microsoft Learn - Rust
[https://docs.microsoft.com/ko-kr/learn/paths/rust-first-steps/](https://docs.microsoft.com/ko-kr/learn/paths/rust-first-steps/)
3. 예제로 배우는 Rust 프로그래밍
[http://rust-lang.xyz/](http://rust-lang.xyz/)

### <동영상>

1. Rust Programming Course for Beginners: freeCodeCamp - Tutorial(영문)
[https://youtu.be/MsocPEZBd-M](https://youtu.be/MsocPEZBd-M)
2. 한글 동영상 강의(개인)
[https://youtu.be/W9DO6m8JSSs](https://youtu.be/W9DO6m8JSSs)

### <책>

1. The Rust Programming Language
[https://lise-henry.github.io/books/trpl2.pdf](https://lise-henry.github.io/books/trpl2.pdf)

### <인터뷰>

rust를 사용하는 이유 : [https://stackoverflow.blog/2020/06/05/why-the-developers-who-use-rust-love-it-so-much/](https://stackoverflow.blog/2020/06/05/why-the-developers-who-use-rust-love-it-so-much/)
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