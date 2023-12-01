import Head from "next/head";
import styles from "../styles/Index.module.css"
import Header from "../components/Header";

//fonts
import { Inter } from "next/font/google"
import { useRouter } from "next/router";
import Image from "next/image";
const inter200 = Inter({
    subsets: ["latin"],
    weight: "200"
})
const inter500 = Inter({
    subsets: ["latin"],
    weight: "500",
    
})

export default function Index(){
    const rotas = useRouter()
    return <div className={styles.background}>
        <Head>
            <link rel="icon" href="/favicon.svg" />
            <title>Chat app | Descubra</title>
        </Head>
        <Header title={"Chat app"} lightBg preventAutoRedirect/>
        <section className={styles.main1}>
            <img src="/img/index1.png" alt={"Chat app mockup"}/>
            <div className={inter200.className + " " + styles.box1}>
                <h1>Seu novo mensageiro está aqui</h1>
                <p className={inter500.className + " " + styles.description}>&gt; Conversas em tempo real<br/>
                &gt; Acesse onde e quando quiser<br/>
                &gt; Conversas ilimitadas para qualquer lugar do planeta
                </p>
                <button className={styles.button} onClick={()=>{rotas.push("/signin")}}>Quero criar a minha conta</button>
            </div>
        </section>
        <section className={styles.main2}>
            <div className={inter200.className + " " + styles.box2}>
                <h1>Conversas em tempo real</h1>
                <p className={inter500.className + " " + styles.description}>
                    Compartilhe suas ideias com seus amigos ou familiares em tempo real para qualquer lugar do globo
                </p>
            </div>
            <Image width={500} height={500} src="/img/globe.jpg" alt={"Chat app mockup"}/>
        </section>
        <section className={styles.main3}>
            <div className={styles.projectBox}>
                <h1 className={inter200.className}>Sobre o projeto</h1>
                <div className={styles.cards + " " + inter200.className}>
                    <div className={styles.card}>
                        <div className={styles.title}>
                            <Image width={500} height={500} src="/img/project.png" alt="project"/>
                            <h3>Projeto</h3>
                        </div>
                        <div>
                            <p>Este é um projeto desenvolvido com  Next.js e Firebase e tem por objetivo aplicar conhecimentos de desenvolvimento de software, bem como registrar portifólio pessoal.</p>
                        </div>
                        <div className={styles.techs}>
                            <button className={styles.nextjs}></button>
                            <button className={styles.firebase}></button>

                        </div>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.title}>
                            <Image  width={500} height={500} src="/img/repositorio.png" alt="repositório"/>
                            <h3>Repositórios</h3>
                        </div>
                        <div>
                            <p>O repositório pode ser encontrado no link a seguir. <br/><br/>O código pode ser estudado, para quem  busca conhecer um pouco mais sobre os frameworks utilizados.</p>
                        </div>
                        <button className={styles.github}>github.com/laube-developer</button>
                    </div>
                    <div className={styles.card}>
                        <div className={styles.title}>
                            <Image  width={500} height={500} src="/img/user.png" alt="user"/>
                            <h3>Autor</h3>
                        </div>
                        <div>
                            <div className={styles.autor} src="/img/autor.jpeg"></div>
                            <p>Militar da ativa<br/><br/>Cursando Engenharia de Software na Universidade de Brasília</p>
                        </div>
                        <button className={styles.linkedinButton}>
                            <div className={styles.linkedin}></div>
                            <div className={styles.name}>
                                <p>Rafael Laube</p>
                            </div>
                        </button>

                    </div>
                </div>
            </div>
        </section>
    </div>
}