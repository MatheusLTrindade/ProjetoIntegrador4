// icons
import { BsArrowRight, BsMouseFill } from 'react-icons/bs';
import { ImBin } from 'react-icons/im';
import { BiSolidImageAdd } from 'react-icons/bi';

// next
import Image from 'next/image';

// react
import { useState } from 'react';

// mask
import { IMaskInput } from "react-imask";

// framer motion
import { motion } from 'framer-motion';
import { fadeIn } from '../../variants';

export default function FormRegister(params) {
  // Api ViaCep
  const [cep, setCep] = useState();
  const [address, setAddress] = useState({});
  const handleCepChange = async (e) => {
    const newCep = e.target.value;
    setCep(newCep);
    if (newCep.length === 9) {
      try {
        const resp = await fetch(`https://viacep.com.br/ws/${newCep}/json`);
        // const resp = await fetch(`api/viaCep&cep=${newCep}`);
        if (resp.ok) {
          const data = await resp.json();
          setAddress({ logradouro: data.logradouro, bairro: data.bairro });
        } else {
          setAddress({ logradouro: '', bairro: '' });
        }
      } catch (error) {
        setAddress({ logradouro: '', bairro: '' });
      }
    } else {
      setAddress({ logradouro: '', bairro: '' });
    }
  };

  // Image
  const [selectedImage, setSelectedImage] = useState();
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const removeSelectedImage = () => {
    setSelectedImage();
  };

  // Birthday +18year
  const hoje = new Date();
  hoje.setFullYear(hoje.getFullYear() - 18); // Subtrai 18 anos da data atual
  const ano = hoje.getFullYear();
  const mes = String(hoje.getMonth() + 1).padStart(2, '0'); // Adiciona zero à esquerda, se necessário
  const dia = String(hoje.getDate()).padStart(2, '0'); // Adiciona zero à esquerda, se necessário
  const dataMaxima = `${ano}-${mes}-${dia}`;

  return (
    <motion.form
      variants={ fadeIn('up', 0.4) }
      initial='hidden'
      animate='show'
      exit='hidden'
      action=''
      className='flex-1 flex flex-col gap-6 w-full mx-auto relative'
    >
      {/* input groups */}
      <div className='flex flex-col items-center'>
        <label htmlFor="fileInput" className={`${selectedImage && 'hidden'} inline-block input cursor-pointer w-auto p-2 transition-all duration-300 hover:text-accent hover:border-accent`}>
          <BiSolidImageAdd className='text-4xl'/>
        </label>
        <input type='file' id="fileInput" name='photo' className='hidden' onChange={imageChange}/>

        {selectedImage && (
          <div className='relative flex items-center justify-center'>
            <Image
              src={URL.createObjectURL(selectedImage)}
              width={100}
              height={100}
              alt="Profile picture"
              className='rounded-full drop-shadow-lg shadow-lg w-[100px] h-[100px]'
            />
            <button className='absolute -bottom-2' onClick={removeSelectedImage}>
              <ImBin className='transition-all duration-300 hover:text-lg hover:text-accent'/>
            </button>
          </div>
        )}
      </div>
      <div className='flex flex-col gap-2 w-full mx-auto max-xl:overflow-y-scroll max-xl:h-[250px] max-xl:bg-white/10 max-xl:p-2 max-xl:rounded-xl'
      >
        <div className='flex flex-col gap-2 w-full'>
          <div className='flex flex-col xl:flex-row gap-2 w-full'>
            <motion.input 
              variants={ fadeIn('right', 0.6) }
              initial='hidden'
              animate='show'
              exit='hidden'
              action=''
              type='text' name='username' placeholder='username' className='input'/>
            <motion.input 
              variants={ fadeIn('left', 0.6) }
              initial='hidden'
              animate='show'
              exit='hidden'
              action='' 
              type='text' name='name' placeholder='name' className='input'/>
          </div>
          <div className='flex flex-col xl:flex-row gap-2 w-full'>
            <motion.div
              variants={ fadeIn('right', 0.8) }
              initial='hidden'
              animate='show'
              exit='hidden'
              action='' 
              className='w-full'>
              <IMaskInput mask="000.000.000-00" type='text' name='cpf' placeholder='CPF' className='input'/>
            </motion.div>
            <motion.input 
              variants={ fadeIn('up', 0.4) }
              initial='hidden'
              animate='show'
              exit='hidden'
              action=''
              type='date' name='birthday' className='input cursor-pointer xl:max-w-[170px]' max={dataMaxima}/>
            <motion.div
              variants={ fadeIn('left', 0.8) }
              initial='hidden'
              animate='show'
              exit='hidden'
              action='' 
              className='w-full'>
              <IMaskInput mask="+55 (00) 0 0000-0000" type='tel' name='phone' placeholder='phone' className='input'/>
            </motion.div>
          </div>
          <div className='flex flex-col xl:flex-row gap-2 w-full'>
            <motion.div
              variants={ fadeIn('right', 1.0) }
              initial='hidden'
              animate='show'
              exit='hidden'
              action='' >
              <IMaskInput mask="00000-000" type='text' name='zip' placeholder='zip' value={cep} onChange={handleCepChange} className='input xl:max-w-[150px]'/>
            </motion.div>
            <motion.input
              variants={ fadeIn('left', 1.0) }
              initial='hidden'
              animate='show'
              exit='hidden'
              action='' 
              type='text' name='address' placeholder='address' value={address.logradouro} className='input' readOnly />
          </div>
          <div className='flex flex-col xl:flex-row gap-2 w-full'>
            <motion.input
              variants={ fadeIn('right', 1.2) }
              initial='hidden'
              animate='show'
              exit='hidden'
              action='' 
              type='text' name='bairro' placeholder='bairro' value={address.bairro} className='input'/>
            <motion.input
              variants={ fadeIn('up', 0.6) }
              initial='hidden'
              animate='show'
              exit='hidden'
              action='' 
              type='text' name='complement' placeholder='complement' className='input'/>
            <motion.input
              variants={ fadeIn('left', 1.2) }
              initial='hidden'
              animate='show'
              exit='hidden'
              action='' 
              type='text' name='number' placeholder='number' className='input xl:max-w-[120px]'/>
          </div>
          <div className='flex flex-col xl:flex-row gap-2 w-full'>
            <motion.input
              variants={ fadeIn('right', 1.4) }
              initial='hidden'
              animate='show'
              exit='hidden'
              action='' 
              type='email' name='email' placeholder='email' className='input'/>
            <motion.input
              variants={ fadeIn('left', 1.4) }
              initial='hidden'
              animate='show'
              exit='hidden'
              action='' 
              type='password' name='password' placeholder='password' className='input'/>
          </div>
        </div>
      </div>
      {/* span scroll */}
      <motion.p
        variants={ fadeIn('up', 0.8) }
        initial='hidden'
        animate='show'
        exit='hidden'
        action='' 
        className="flex xl:hidden absolute justify-center items-center gap-2 text-xs writing-vertical-lr text-white/50 bottom-20 -right-4">
        <span className='tracking-[-1.75px]'>---</span>
        Scroll Down
        <BsMouseFill />
        <span className='tracking-[-1.75px]'>---</span>
      </motion.p>
      {/* button send */}
      <motion.div
        variants={ fadeIn('right', 1.6) }
        initial='hidden'
        animate='show'
        exit='hidden'
        action=''>
        <button 
          className='
          btn rounded-full border border-white/50 max-w-[120px] px-8 
          transition-all delay-300 flex items-center justify-center 
          overflow-hidden hover:border-accent hover:border-2 group hover:translate-x-6'
        >
          <span className='
            group-hover:-translate-y-[120%] group-hover:opacity-0 
            transition-all delay-200 duration-200'
          >
            Cadastrar
          </span>
          <BsArrowRight className='
            -translate-y-[120%] opacity-0 group-hover:flex 
            group-hover:-translate-y-0 group-hover:opacity-100 
            transition-all delay-200 duration-200 absolute text-[30px] 
          text-accent font-bold' 
          />
        </button>
      </motion.div>
    </motion.form>
  )
};