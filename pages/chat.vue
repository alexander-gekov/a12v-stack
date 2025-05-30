<script setup lang="ts">
import { useChat } from "@ai-sdk/vue";
import { LucideArrowUp } from "lucide-vue-next";
import { nextTick, watch } from "vue";

definePageMeta({
  title: "Chat",
  layout: "default",
});

const { enter } = useMagicKeys();
const model = ref("meta-llama/Llama-3.2-3B-Instruct-Turbo");

const models = [
  "meta-llama/Llama-3.2-3B-Instruct-Turbo",
  "meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo",
  "google/gemma-2b-it",
];

const { messages, input, handleSubmit } = useChat({
  api: "/api/ai/chat",
  body: computed(() => ({
    modelName: model.value,
  })),
});

watch(enter, (v) => {
  if (v) handleSubmit();
  input.value = "";
});

const exampleQuestions = [
  "How does AI work?",
  "Are black holes real?",
  'How many Rs are in the word "strawberry"?',
  "What is the meaning of life?",
];

const scrollToBottom = () => {
  nextTick(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  });
};

const { user } = useUser();

watch(messages, scrollToBottom, { deep: true });
</script>

<template>
  <div class="flex flex-col h-[calc(100vh-100px)]">
    <PageHeader title="Chat" description="Chat with your AI" />

    <div class="flex-1 flex flex-col max-w-2xl mx-auto w-full overflow-hidden">
      <div id="chat-container" class="flex-1 overflow-y-auto">
        <div class="h-full p-4">
          <template v-if="messages.length === 0">
            <div class="h-full flex flex-col items-center justify-center">
              <h1 class="text-4xl font-bold mb-8">How can I help you?</h1>

              <div
                class="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-2xl mb-8"
              >
                <Button
                  v-for="question in exampleQuestions"
                  :key="question"
                  variant="outline"
                  class="text-wrap h-fit text-xs sm:text-sm text-left"
                  @click="input = question"
                  @submit="handleSubmit"
                >
                  {{ question }}
                </Button>
              </div>
            </div>
          </template>

          <div v-else class="space-y-6">
            <div
              v-for="(m, index) in messages"
              :key="m.id ? m.id : index"
              :class="[
                'flex items-start gap-3',
                m.role === 'user' ? 'flex-row-reverse' : 'flex-row',
              ]"
            >
              <Avatar
                :class="[
                  'flex-none',
                  m.role === 'user' ? 'bg-primary' : 'bg-muted',
                ]"
              >
                <AvatarImage
                  v-if="m.role === 'user' && user?.imageUrl"
                  :src="user?.imageUrl"
                />
              </Avatar>

              <div
                :class="[
                  'flex flex-col space-y-2 max-w-[80%]',
                  m.role === 'user' ? 'items-end' : 'items-start',
                ]"
              >
                <div class="text-sm text-zinc-400">
                  {{ m.role === "user" ? "You" : "Assistant" }}
                </div>
                <div
                  :class="[
                    'rounded-lg p-3',
                    m.role === 'user' ? 'bg-primary/10' : 'bg-muted',
                  ]"
                >
                  <div v-for="part in m.parts" :key="part.type">
                    <div
                      v-if="part.type === 'text'"
                      class="prose prose-invert whitespace-pre-wrap max-w-none"
                    >
                      {{ part.text }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="flex-none p-2 lg:p-4 border-t bg-background">
        <form @submit.prevent="handleSubmit" class="flex flex-col space-y-2">
          <Select v-model="model">
            <SelectTrigger>
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Models</SelectLabel>
                <SelectItem v-for="model in models" :key="model" :value="model">
                  {{ model }}
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>

          <div class="flex items-center space-x-2 rounded-lg border-white/10">
            <Textarea
              rows="2"
              v-model="input"
              placeholder="Type your message here..."
              class="flex-1"
            />
            <Button
              type="submit"
              variant="default"
              size="icon"
              class="rounded-full flex-none"
            >
              <LucideArrowUp class="h-5 w-5" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
