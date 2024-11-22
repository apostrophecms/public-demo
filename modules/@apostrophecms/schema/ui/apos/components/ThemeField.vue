<template>
  <AposInputWrapper
    :field="field"
    :error="effectiveError"
    :uid="uid"
    :modifiers="modifiers"
    :display-options="displayOptions"
  >
    <template #body>
      <div class="wrapper">
        <div class="themes">
          <div
            v-for="theme in themes"
            class="theme"
            :class="[
              theme.name,
              { selected: modelValue.data === theme.name }
            ]"
            @click="select(theme.name)"
          >
            <div
              class="type-sample"
              :style="`font-family: ${theme.fonts.headline}`"
            >
              Aa
            </div>
            <div class="colors-sample">
              <div
                v-for="value in theme.colors"
                class="color-sample"
                :style="`background-color: ${value}`"
              />
            </div>
            <div class="button-sample">
              <button
                class="button"
                :style="[
                  { 'border-radius': theme.radius },
                  { 'background-color': theme.colors.two },
                  { 'border': `1px solid ${theme.colors.four}` },
                ]"
              >
                <span :style="`font-family: ${theme.fonts.body}`"
                  >Read More</span
                >
                <svg viewBox="0 0 24 24">
                  <g style="display: inline; fill: rgb(15, 20, 25);">
                    <path
                      d="M12.957 4.54L20.414 12l-7.457 7.46-1.414-1.42L16.586 13H3v-2h13.586l-5.043-5.04 1.414-1.42z"
                      style="border-width: 0px; display: inline; fill: rgb(15, 20, 25); text-decoration: none solid rgb(15, 20, 25);"
                    ></path>
                  </g>
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          class="preview"
          :class="modelValue.data"
          :style="`background-color: ${themes[modelValue.data].colors.one}`"
        >
          <div class="style-tile">
            <div
              class="t-meta"
              :style="[
                  { 'font-family': themes[modelValue.data].fonts.meta },
                  { 'letter-spacing': '1px' },
                  { 'margin-bottom': '30px' },
                  { 'color': themes[modelValue.data].colors.four }
                ]"
            >
              An example secondary line
            </div>
            <div
              class="t-headline"
              :style="`font-family: ${themes[modelValue.data].fonts.headline}`"
            >
              Bigger, <strong>bolder</strong>, and <em>better</em>.
            </div>
            <p
              class="t-body"
              :style="`font-family: ${themes[modelValue.data].fonts.body}`"
            >
              A growth is a sentence from the right perspective. Authors often
              misinterpret the port as a grasping spandex, when in actuality it
              feels more like a carping share.
            </p>
          </div>
          <div class="cards">
            <div
              class="card a"
              :style="[
                  { 'background-color': themes[modelValue.data].colors.two },
                ]"
            >
              <div
                class="t-headline"
                :style="[
                  { 'font-size': '58px' },
                  { 'font-style': 'italic' },
                  { 'padding-top': '15px' },
                  { 'margin-bottom': '20px' },
                  { 'border-top': `8px solid ${themes[modelValue.data].colors.four}` },
                  { 'font-family': themes[modelValue.data].fonts.headline }
                ]"
              >
                35.4%
              </div>
              <div>
                <div
                  class="t-body"
                  :style="[
                    { 'font-size': '16px' },
                    { 'padding-bottom': '10px' },
                    { 'font-family': themes[modelValue.data].fonts.body },
                  ]"
                >
                  Weekly signup growth
                </div>
                <div
                  class="link t-meta"
                  style="
                  padding-top: 10px;
                  display: flex;
                  align-items: center;
                  gap: 5px;
                "
                  :style="[
                  { 'border-top': `1px solid ${themes[modelValue.data].colors.four}` },
                  { 'font-family': themes[modelValue.data].fonts.meta },
                  { 'color': themes[modelValue.data].colors.four },
                ]"
                >
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      :stroke="themes[modelValue.data].colors.five"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-chart-no-axes-combined"
                    >
                      <path d="M12 16v5" />
                      <path d="M16 14v7" />
                      <path d="M20 10v11" />
                      <path
                        d="m22 3-8.646 8.646a.5.5 0 0 1-.708 0L9.354 8.354a.5.5 0 0 0-.707 0L2 15"
                      />
                      <path d="M4 18v3" />
                      <path d="M8 14v7" />
                    </svg>
                  </span>
                  <span style="font-size: 14px;"> Global Metrics </span>
                  <span
                    style="
                    flex: 1;
                    display: inline-flex;
                    justify-content: flex-end;
                  "
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      class="lucide lucide-move-up-right"
                    >
                      <path d="M13 5H19V11" />
                      <path d="M19 5L5 19" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
            <div
              class="card b"
              :style="[
                  { 'background-color': themes[modelValue.data].colors.five },
                  { 'color': themes[modelValue.data].colors.one },
                ]"
            >
              <div
                class="t-headline"
                :style="[
                  { 'font-size': '60px' },
                  { 'font-family': themes[modelValue.data].fonts.headline }
                ]"
              >
                Standard Equipment Co.
              </div>
              <div class="headshots">
                <div
                  v-for="h in headshots"
                  class="headshot"
                  :style="[
                    { 'background-image': `url(${h})` }
                  ]"
                >
                  <div
                    class="overlay"
                    :style="[
                      { 'background-color': themes[modelValue.data].colors.five }
                    ]"
                  />
                </div>
              </div>
              <div class="graph">
                <div class="info">
                  <div
                    class="detail"
                    :style="[
                      { 'font-size': '16px' },
                      { 'font-family': themes[modelValue.data].fonts.body }
                    ]"
                  >
                    Brand Collaboration Revenue
                  </div>
                  <div
                    class="metric"
                    :style="[
                        { 'font-size': '64px' },
                        { 'font-family': themes[modelValue.data].fonts.headline }
                    ]"
                  >
                    72%
                  </div>
                </div>
                <div
                  class="bar-graph"
                  :style="[
                    { 'background-color': themes[modelValue.data].colors.two },
                    { 'border': `2px solid ${themes[modelValue.data].colors.two}` }
                  ]"
                >
                  <div
                    class="active"
                    :style="[
                      { 'width': '72%' },
                      { 'background-color': themes[modelValue.data].colors.four }
                    ]"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </AposInputWrapper>
</template>

<script>
import AposInputSelectLogic from '../logic/AposInputSelect';
import AposInputMixin from 'Modules/@apostrophecms/schema/mixins/AposInputMixin';
import AposInputChoicesMixin from 'Modules/@apostrophecms/schema/mixins/AposInputChoicesMixin';
export default {
  name: 'ThemeField',
  mixins: [ AposInputMixin, AposInputChoicesMixin, AposInputSelectLogic ],
  data() {
    return {
      next: (this.modelValue.data == null) ? null : this.modelValue.data,
      currentValue: 'one',
      themes: {
        one: {
          name: 'one',
          fonts: {
            meta: "'Consolas', 'Monaco', monospace'",
            headline: "'Optima', 'Segoe', 'Segoe UI', 'Candara', 'Calibri', 'Arial', sans-serif",
            body: "tahoma, geneva, verdana, kalimati, sans-serif"
          },
          colors: {
            one: '#FFFFFF',
            two: '#F5F5F5',
            three: '#D9D9D9',
            four: '#797979',
            five: '#000000',
          },
          radius: '5px'
        },
        two: {
          name: 'two',
          fonts: {
            meta: "'Dejavu Sans', 'Arial', 'Verdana', sans-serif'",
            headline: "'Rockwell', 'Courier Bold', 'Courier', 'Georgia', 'Times'",
            body: "'Georgia', 'Times', 'Times New Roman', serif"
          },
          colors: {
            one: '#FFFFFF',
            two: '#E1DFD9',
            three: '#209D50',
            four: '#1D231C',
            five: '#000000',
          },
          radius: '2px'
        },
        three: {
          name: 'three',
          fonts: {
            meta: '"courier new", courier, andale mono, "free mono", monospace',
            headline: "'Gill Sans', 'Gill Sans MT', 'Calibri', sans-serif",
            body: "Lucida Sans', 'Helvetica', 'Arial', sans-serif"
          },
          colors: {
            one: '#FCF0F0',
            two: '#D1C8F4',
            three: '#AE9DEF',
            four: '#9B2929',
            five: '#531A4A',
          },
          radius: '10px'
        },
        four: {
          name: 'four',
          fonts: {
            meta: "'Gill Sans', 'Gill Sans MT', 'Calibri', sans-serif",
            headline: "'Didot', 'Didot LT STD', 'Hoefler Text', 'Garamond', 'Calisto MT', 'Times New Roman', serif",
            body: "'Goudy Old Style', 'Garamond', 'Big Caslon', 'Times New Roman', serif"
          },
          colors: {
            one: '#EAE6DD',
            two: '#EED286',
            three: '#7CB4B2',
            four: '#34659B',
            five: '#2D2D2A',
          },
          radius: '30px'
        }
      },
      metaSample: 'Some small text',
      bodySample: 'A growth is a sentence from the right perspective. Authors often misinterpret the port as a grasping spandex, when in actuality it feels more like a carping share. Those minibuses are nothing more than fights. To be more specific, unpeeled beats show us how squares can be shirts.',
      headshots: [
        'https://www.studiocabrelli.com/wp-content/uploads/2020/05/headshot-photographer-paris@studiocabrelli_0002.jpg',
        'https://www.eastcoastcapture.com/wp-content/uploads/2024/03/93d00b8396a14377ad35972239b97bc0-copy-400x400.jpeg',
        'https://www.cwc.life/wp-content/uploads/2017/03/tyler-perry-headshot.jpg'
      ]
    };
  },
  methods: {
    select(theme) {
      this.next = theme;
    },
    validate(value) {
      if (this.field.required && (value === null)) {
        return 'required';
      }

      if (!value) {
        return 'invalid';
      }

      return false;
    },
  }
};
</script>

<style>
.apos-field__wrapper--theme {
  max-width: none !important;
}
.apos-modal__rail.apos-modal__rail--right {
  display: none;
}
.apos-modal__main--with-rails {
  grid-template-columns: 15% 1fr !important;
}
</style>

<style scoped lang="scss">
 .wrapper {
   display: flex;
   gap: 20px;
   width: 100%;
 }

 .theme {
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 10px;
   border: 1px solid var(--a-base-6);
   padding: 20px;
   border-radius: 8px;

   &.selected {
     border-color: var(--a-primary);
     background-color: var(--a-primary-transparent-25);
   }

   &:hover:not(.selected) {
     cursor: pointer;
     background-color: var(--a-base-9);
     border-color: var(--a-primary-transparent-25);
   }

 }

 .type-sample {
   font-size: 52px;
 }

 .button-sample {
   .button {
     font-size: 15px;
     padding: 10px 28px;
     align-items: center;
     border-width: 0px;
     box-sizing: border-box;
     color: rgb(15, 20, 25);
     display: flex;
     font-size: 14px;
     line-height: 16px;
     text-decoration: none solid rgb(15, 20, 25);
     unicode-bidi: isolate;
     white-space-collapse: preserve;
     width: 100%;
     white-space: nowrap;
   }
   svg {
     border-width: 0px;
   color: rgb(15, 20, 25);
   display: block;
   fill: rgb(15, 20, 25);
   flex-shrink: 0;
   height: 18.75px;
   overflow-clip-margin: content-box;
   overflow: hidden;
   position: relative;
   text-decoration: none solid rgb(15, 20, 25);
   vertical-align: text-bottom;
   padding-left: 8px;
   }
 }

 .colors-sample {
   justify-content: center;
   display: grid;
   grid-template-columns: repeat(auto-fit,  minmax(10px, max-content)) ;
   max-width: 50%;
 }

 .color-sample {
   height: 90px;
   width: 70px;
   border-radius: 4px;
   border: 1px solid #cccccc2d;
 }

 .themes {
   display: flex;
   flex-direction: column;
   gap: 10px;
   width: 40%;
 }

.colors {
   display: flex;
 }

 .color {
   flex: 1;
   display: inline-flex;
   align-items: center;
   justify-content: center;
   height: 30px;
 }

 .headshots {
   display: flex;
   gap: 2px;
   margin: 30px 0 10px;
 }

 .headshot {
   position: relative;
   width: 50px;
   height: 50px;
   border-radius: 50%;
   background-repeat: no-repeat;
   background-position: center;
   background-size: cover;

   .overlay {
     z-index: 1;
     content: '';
     position: absolute;
     top: 0;
     left: 0;
     width: 100%;
     height: 100%;
     border-radius: 50%;
     mix-blend-mode: plus-lighter;
   }
 }

 .graph {

   .info {
     display: flex;
     justify-content: space-between;
     align-items: flex-end;
   }
   .metric {
     line-height: 0.75;
   }
   .bar-graph {
     margin-top: 10px;
     height: 40px;
   }
   .active {
     height:40px;
   }
 }

 .cards {
   display: flex;

   .a {
     width: 30%;
     display: flex;
     flex-direction: column;
     justify-content: flex-end;
     gap: 10px;
   }
   .b {
     width: 70%;
   }
 }

 .card {
   // background-color: white;
   // border-radius: 16px;
   padding: 20px;
 }

 .preview {
   width: 60%;
   background-color: var(--a-base-10);
   border-radius: 16px;
   border: 1px solid #ededed;

   .style-tile {
     padding: 50px 30px 10px;
   }

   .t-meta {
     font-size: 16px;
   }
   .t-headline {
     font-size: 72px;
     max-width: 570px;
   }
   .t-body {
     font-size: 18px;
     line-height: 1.3;
     margin-top: 10px;
     max-width: 500px;
   }
 }
</style>
